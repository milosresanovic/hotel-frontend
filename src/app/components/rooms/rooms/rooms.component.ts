import { Component, Renderer2, OnInit} from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import {ICategory} from "../interface/i-category";
import {IEquipment} from "../interface/i-equipment";
import {IRoom} from "../interface/i-room";
import {CategoryService} from "../services/categories/category.service";
import {EquipmentService} from "../services/equipments/equipment.service";
import {RoomService} from "../services/rooms/room.service";
import {forkJoin, Observable, Subscription} from "rxjs";
import {PriceColorPipe} from "../../../shared/pipes/price/price-color-pipe.pipe";


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  /*categories: ICategory[] = [];*/
  /*equipments: IEquipment[] = [];*/
  rooms: any = [];
  keyword: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  personsNumber: number = 0;
  pagesCount: any[] = [];
  subscription: Subscription = new Subscription();
  constructor(
    private roomService: RoomService,
    /*private categoryService: CategoryService,
    private equipmentService: EquipmentService,*/
    //public filterFormService: FilterFormService,
    //public router: Router,
    //public route: ActivatedRoute
  ) { }


  ngOnInit(): void{
    this.roomService.getAll().subscribe({
      next: (data: any) =>{
        this.rooms = data;
        console.table(data.data);
        this.pagesCount = Array.from({ length: this.rooms.pagesCount }, (_, i) => i + 1);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
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
    let i: number = 0;
    equipments.forEach((e:any)=>{
      i++;
      if(i<3){
        eq += e.name + ', ';
      }
      if(i==3){
        eq += e.name;
        return;
      }
    })
    return eq;
  }

  searchRooms():void{
    this.roomService.getAll(this.keyword, this.minPrice, this.maxPrice, this.personsNumber).subscribe({
      next: (data: any) =>{
        this.rooms = data;
        console.log(data);
        this.pagesCount = Array.from({ length: this.rooms.pagesCount }, (_, i) => i + 1);
      },
      error: (err: any)=>{
        console.log(err);
      }
    })
  }

  goToPage(page: number) {
    const keyword = this.keyword;
    const minPrice = this.minPrice;
    const maxPrice = this.maxPrice;
    const personsNumber = this.personsNumber;

    //const perPage = this.filterForm.get('perPage')?.value;

    this.roomService.getAll(keyword, minPrice, maxPrice, personsNumber, undefined, page).subscribe({
      next: (data: any) => {
        this.rooms = data;
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  previousPage() {
    const currentPage = this.rooms.currentPage;
    if (currentPage > 1) {
      this.goToPage(currentPage - 1);
    }
  }

  nextPage() {
    const currentPage = this.rooms.currentPage;
    const totalPages = this.pagesCount.length;
    if (currentPage < totalPages) {
      this.goToPage(currentPage + 1);
    }
  }

}
