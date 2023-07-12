import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoomDetailsService} from "../room-details/services/room-details.service";
import {MakeReservationService} from "../room-details/services/Reservations/make-reservation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loginData:any = {}
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void{
    this.loginForm = new FormGroup<any>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  loginUser():void{
    if(this.loginForm.valid){
      let email = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value;

      this.loginData = {
        Email: email,
        Password: password
      }

      this.loginService.create(this.loginData).subscribe({
        next: (data: any) => {
          console.log(data.token);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/rooms']);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
}
