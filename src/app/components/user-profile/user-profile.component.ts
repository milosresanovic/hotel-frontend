import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {MakeReservationService} from "../room-details/services/Reservations/make-reservation.service";
import {GetUserInfoService} from "./services/get-user-info.service";
import {UpdateUserService} from "./services/update-user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  user: any = {};
  email: string = '';
  userId: number = 0;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  image!: File;
  updateForm!: FormGroup;
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private updateUserService: UpdateUserService,
    private getUserInfoService: GetUserInfoService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit():void{
    let token: string | null = localStorage.getItem('token');
    if(token){
      let decodedToken = this.jwtHelper.decodeToken(token);
      this.email = decodedToken.Email;
      this.userId = decodedToken.UserId;
      this.username = decodedToken.Username;

      this.getUserInfoService.get(this.userId).subscribe({
        next: (data: any) =>{
          this.user = data;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          console.table(data);
        },
        error: (err: any) => {
          this.router.navigate(['/']);
        }
      })
    }else{
      console.log('greska')
      this.router.navigate(['home']);
    }


    this.updateForm = new FormGroup<any>({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),

    })
  }

  handleImageInput(event: any) {
    this.image = event.target.files[0];
  }
  updateUserProfile(): void{
    if(this.updateForm.valid){
      const formData = new FormData();

      formData.append('image', this.image);
      //formData.append('UserId', this.userId.toString());
      formData.append('FirstName', this.firstName);
      formData.append('LastName', this.lastName);
      formData.append('Username', this.username);

/*      this.userData = {
        UserId: this.userId,
        FirstName: this.firstName,
        LastName: this.lastName,
        Username: this.username,
        Image: this.image,
      }*/

      this.updateUserService.update(this.userId, formData).subscribe({
        next: (data: any) => {
          console.log('DODO SAM :D')
          //this.makeReservation.reset();
          //alert("Uspesna reservacija.")
          /*if (formSubmitException) {
            formSubmitException.classList.remove("text-danger");
            formSubmitException.classList.add("text-white");
            formSubmitException.innerHTML = "You successfully rented a car!";
          }*/
        },
        error: (err: any) => {
          console.log("greska")
          console.log(err);
          /*if (formSubmitException) {
            formSubmitException.innerHTML = err.error.errors[0].error;
          }*/
        }
      });
    }
  }
}
