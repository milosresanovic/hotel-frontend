import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projaket_hotel';
  constructor(
    private router: Router
  ) {
  }
  isLoggedIn(): boolean{
    let token: string | null;
    token = localStorage.getItem('token');
    return token != null;
  }

  logoutUser(): any{
    console.log('lmao logout')
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
