import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ICategory} from "../../rooms/interface/i-category";
import {IEquipment} from "../../rooms/interface/i-equipment";
import {IRoom} from "../../rooms/interface/i-room";
import {forkJoin, Observable, Subscription} from "rxjs";
import {RoomService} from "../../rooms/services/rooms/room.service";
import {CategoryService} from "../../rooms/services/categories/category.service";
import {EquipmentService} from "../../rooms/services/equipments/equipment.service";
import {RoomDetailsService} from "../services/room-details.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MakeReservationService } from "../services/Reservations/make-reservation.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit{
  roomId: number = 0;
  room: any;
  subscription: Subscription = new Subscription();
  reservationError: string = "";
  reservationsSuccess: string = "";
  makeReservation!: FormGroup;
  reservationData: any = {};
  userId: number = 0;

  constructor(
    private singleRoomService: RoomDetailsService,
    private makeReservationService: MakeReservationService,
    public router: Router,
    public route: ActivatedRoute,
    private jwtHelper: JwtHelperService

  ) { }
  ngOnInit(): void{
    this.makeReservation = new FormGroup({
      dateIn: new FormControl('', [Validators.required, this.dateInValidator]),
      dateOut: new FormControl('', [Validators.required, this.dateOutValidator]),
      personsNumber: new FormControl('', [Validators.required])
    })



    this.route.params.subscribe(params => {
      this.roomId = params['id'];
    })
    this.singleRoomService.get(this.roomId).subscribe({
      next: (data: any) =>{
        this.room = data;
        console.table(data);
      },
      error: (err: any) => {
        this.router.navigate(['/']);
      }
    })


  }

  dateInValidator = (control: FormControl): { [key: string]: any } | null => {
    if (!this.makeReservation) {
      return null;
    }

    const currentDate = new Date();
    const dateIn = new Date(control.value);

    if (dateIn < currentDate) {
      return { startDateInPast: true };
    }

    return null;
  };

  dateOutValidator = (control: FormControl): { [key: string]: any } | null => {
    if (!this.makeReservation) {
      return null;
    }

    const dateIn = this.makeReservation.get('dateIn')?.value;
    const dateOut = control.value;

    if (dateIn && dateOut) {
      const start = new Date(dateIn);
      const end = new Date(dateOut);

      if (end < start) {
        return { endDateLessThanStartDate: true };
      }
    }else{
      const end = new Date(dateOut);
      console.log("new Date()")
      if(end < new Date()){
        console.log(new Date())
        return { endDateLessThanCurrentDate: true };
      }
    }

    return null;
  };

  makeReservationSubmit():void{
    this.reservationError = '';
    this.reservationsSuccess = "";
    if(this.makeReservation.valid){
      let roomId = this.roomId;
      let dateIn = this.makeReservation.get('dateIn')?.value;
      let dateOut = this.makeReservation.get('dateOut')?.value;
      let guestsNumber = this.makeReservation.get('personsNumber')?.value;



      let token: string | null = localStorage.getItem('token');
      if(token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        this.userId = decodedToken.UserId;

        this.reservationData = {
          ApartmentId: roomId,
          DateFrom: dateIn,
          DateTo: dateOut,
          PersonsNumber: guestsNumber
        }
      }else{
        this.makeReservation.invalid;
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


      this.makeReservationService.create(this.reservationData, headers).subscribe({
        next: (data: any) => {
          this.makeReservation.reset();
          this.reservationsSuccess = "Reservation successfully created!"
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
          let greska:string = this.reservationError = err.error.errors[0].error;
          console.log(greska)
          this.reservationError = greska;
        }
      });
    }
  }

  calculateArea(rooms: any): number{
    let total: any = 0;
    rooms.forEach((r:any)=>{
      total += r.area;
    })
    return total;
  }

  equipmentsAsString(equipments: any): string{
    let eq: string = "";
    equipments.forEach((e:any)=>{
        eq += e.name + ', ';
    })
    return eq;
  }

  getNumberRange(maxPersons: number): number[] {
    return Array.from({length: maxPersons}, (_, index) => index + 1);
  }

  isLoggedIn(): boolean{
    let token: string | null;
    token = localStorage.getItem('token');
    return token != null;
  }

  calculateAverageStarNumber(room: IRoom): number{
    let sum: number = 0;
    let count = room.comments.length;
    room.comments.forEach((c => {
      sum+=c.starNumber;
    }));

    let avg: number = Math.round(sum / count);
    return avg;
  }

  getNumber(n: number): number[]{
    let array: number[] = [];
    for(let i =0; i< n; i++){
      array.push(i);
    }
    return array;
  }
  /*constructor(
    private roomService: RoomService,
    private categoryService: CategoryService,
    private equipmentService: EquipmentService,
    private route: ActivatedRoute
  ){}
    //public filterFormService: FilterFormService,
    //public router: Router,
    //public route: ActivatedRoute



  loadData(): void{
    const requests: Observable<any>[] = [
      /!*this.categoryService.getData(),
      this.equipmentService.getData(),
      this.roomService.getData()*!/
    ];

    forkJoin(requests).subscribe({
      next: (data: any) => {
        this.categories = data[0];
        this.equipments = data[1];
        this.rooms = data[2];

        // @ts-ignore
        this.room = this.rooms.find((r: IRoom) => r.id == this.roomId);
      }
    })
  }

  findCategoryName(categoryId: number): string{
    let category = this.categories.find(x => x.id === categoryId);
    return category ? category.name : 'Unknown category';
  }

  findEquipmentName(equipmentId: number): string{
    let equipment = this.equipments.find(x => x.id === equipmentId);
    return equipment ? equipment.name : "Unknown equipment"
  }

  makeArrayOfEquiments(equipmentIds: number[]): string{
    console.log((equipmentIds))
    let equipmentsNames: string = '';
    equipmentIds.forEach((id: number) => {
      let name = this.findEquipmentName(id) + ", ";
      equipmentsNames += name;
    })

    if(equipmentsNames[equipmentsNames.length-2] == ","){
      equipmentsNames = equipmentsNames.substring(0, equipmentsNames.length-2);
    }

    return equipmentsNames;
  }

  calculateAverageStarNumber(room: IRoom): number{
    let sum: number = 0;
    let count = room.comments.length;
    room.comments.forEach((c => {
      sum+=c.starNumber;
    }));

    let avg: number = Math.round(sum / count);
    return avg;
  }

  getNumber(n: number): number[]{
    let array: number[] = [];
    for(let i =0; i< n; i++){
      array.push(i);
    }
    return array;
  }*/
}
