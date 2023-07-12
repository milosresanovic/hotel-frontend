import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { RoomsComponent } from './components/rooms/rooms/rooms.component';
import { RoomDetailsComponent } from './components/room-details/room-details/room-details.component';
import { RoomCardComponent } from './components/rooms/room-card/room-card.component';
import { RoomCommentComponent } from './components/room-details/room-comment/room-comment.component';
import { HttpClientModule } from '@angular/common/http';
import { PriceColorPipe } from './shared/pipes/price/price-color-pipe.pipe';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {RoomsModule} from "./components/rooms/rooms.module";
import {SharedModule} from "./shared/shared/shared.module";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import {JwtModule} from "@auth0/angular-jwt";
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    UserProfileComponent,
    LoginComponent,
    UserReservationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    RoomsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['http://localhost:4200'], // Replace with your domain(s)
        disallowedRoutes: ['http://localhost:5120/api/token'], // Replace with your API URL(s)
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
