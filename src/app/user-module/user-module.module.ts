import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,

  ],
  exports:[ UsersComponent,
    UserDetailsComponent,
    UserCardComponent]
})
export class UserModuleModule { }
