import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './user-module/pages/users/users.component';
import { UserDetailsComponent } from './user-module/pages/user-details/user-details.component';

const routes: Routes = [
  {path:"",component:UsersComponent},
  {path:"users",component:UsersComponent},
  {path:"user/:id",component:UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
