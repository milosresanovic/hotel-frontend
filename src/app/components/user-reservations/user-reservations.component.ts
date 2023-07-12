import { Component } from '@angular/core';
import {UserReservationsService} from "./services/user-reservations.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DeleteReservationService} from "./services/delete-reservation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent {

  reservations: any = [];

  constructor(
    private userReservationsService: UserReservationsService,
    private deleteUsersReservationService: DeleteReservationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit():void{
    if(!localStorage.getItem('token')){
      this.router.navigate(['home']);
    }


    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.userReservationsService.getAll(undefined, undefined, undefined, undefined, headers).subscribe({
      next: (data: any) => {
        this.reservations = data;
        console.table(this.reservations);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

  deleteReservation(reservationId: number): void{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.deleteUsersReservationService.delete(reservationId, headers).subscribe({
      next: (data: any) => {
        alert("Uspešno ste obrisali rezervaciju!")
        this.reservations = data;
        console.table(this.reservations);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
