import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { RoomsComponent} from './components/rooms/rooms/rooms.component';
import { RoomDetailsComponent } from './components/room-details/room-details/room-details.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {LoginComponent} from "./components/login/login.component";
import {LoginGuard} from "./guard/login.guard";
import {UserReservationsComponent} from "./components/user-reservations/user-reservations.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'room-details/:id',
    component: RoomDetailsComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'reservations',
    component: UserReservationsComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
