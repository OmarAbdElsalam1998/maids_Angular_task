import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl:string="";
  public usersData:any;
  private cache: Map<string, { data: any, expiration: number }> = new Map<string, { data: any, expiration: number }>();
  private readonly defaultExpirationTime = 600000; // 10 minute
  constructor(private http: HttpClient) {
    this.apiUrl=environment.baseUrl+'/users';
    this.usersData= new BehaviorSubject<any>("");
  }
   //get user by id
   oneUserData(userId:any){
      return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(catchError((err)=>{
        return throwError (()=>err.message ||"internal server error")
      }));

   }

  //get all users
  allusersData(params: any = {}, expirationTime: number = this.defaultExpirationTime): Observable<any> {
    const cacheKey = this.generateCacheKey(params);

    if (this.cache.has(cacheKey)) {
      console.log("cache")
      const cachedEntry = this.cache.get(cacheKey);
      if (cachedEntry!.expiration > Date.now()) {
        console.log(cachedEntry!.data)

        return of (cachedEntry!.data);

      } else {
        this.cache.delete(cacheKey);
      }
    }

    return this.http.get(this.apiUrl, { params }).pipe(
      tap(data => {
        this.cache.set(cacheKey, { data, expiration: Date.now() + expirationTime });
      })
    );
  }

  clearCache(): void {
    this.cache.clear();
  }



  private generateCacheKey( params: any): string {
    const queryParams = new URLSearchParams(params).toString();
    return `${this.apiUrl}?${queryParams}`;
  }



  getfilteredUsersData(){
    return this.usersData;
  }

  setfilteredUsersData(userData:any){
   this.usersData.next(userData);
  }

}



