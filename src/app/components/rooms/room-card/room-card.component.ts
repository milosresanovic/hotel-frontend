import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent {
  @Input() Id: number = 0;
  @Input() Name: string = "";
  @Input() MaxPersons: number = 0;
  @Input() Size: number = 0;
  @Input() Category: string = "";
  @Input() Image: string = "";
  @Input() Price: number = 0;
  @Input() Equipments: string = "";
}



