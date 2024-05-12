import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/user-module/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router:Router,private usersService:UsersService){}

  searchForUser(event: any){
    let serachKeyword=event.target.value;
    if(serachKeyword==""){
      this.usersService.allusersData().subscribe(

        response => {
            this.usersService.setfilteredUsersData(response.data);
        },
        error => {
          // Handle registration error
          console.log("there is no users")
        }
      );
    }
    else{
      this.usersService.oneUserData(serachKeyword).subscribe(

        response => {
            this.usersService.setfilteredUsersData([response.data]);
        },
        error => {
          this.usersService.setfilteredUsersData([]);

          console.log("there is no users")
        }
      );
    }

    this.applyFilters(serachKeyword);

  }
  applyFilters(serachKeyword:any) {
    // Construct query parameters from filter options
    const filters:any = {};
     filters["search"]=serachKeyword;


    // Update query parameters
    this.router.navigate([], { queryParams: filters });

    // Call API or perform filtering logic to get filtered data

  }
}
