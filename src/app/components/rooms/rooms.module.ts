import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryService} from "./services/categories/category.service";
import { RoomService} from "./services/rooms/room.service";
import {EquipmentService} from "./services/equipments/equipment.service";
import { RoomsComponent} from "./rooms/rooms.component";
import { RoomDetailsComponent} from "../room-details/room-details/room-details.component";

import { RoomsRoutingModule } from './rooms-routing.module';
import {SharedModule} from "../../shared/shared/shared.module";

import {RoomCommentComponent} from "../room-details/room-comment/room-comment.component";
import {RoomCardComponent} from "./room-card/room-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [RoomsComponent, RoomDetailsComponent, RoomCommentComponent, RoomCardComponent],
    imports: [
        CommonModule,
        RoomsRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [CategoryService, EquipmentService, RoomService]
})
export class RoomsModule { }
