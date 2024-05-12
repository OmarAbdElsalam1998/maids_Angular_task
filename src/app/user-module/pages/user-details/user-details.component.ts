import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  userId:any;
  userDetails:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private userService:UsersService,
    private location:Location,
    private router:Router
    ){}

  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.getUserDetails(this.userId);

    });

  }
  getUserDetails(userId:any){
    this.userService.oneUserData(userId).subscribe(

      response => {
        this.userDetails=response.data;
        console.log(this.userDetails)

      },
      error => {
        console.log("there is no users")
      }
    );


  }
  goToPreviousPage(){
    this.location.back();

  }
}
