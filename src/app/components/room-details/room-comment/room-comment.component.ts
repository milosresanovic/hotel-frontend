import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-room-comment',
  templateUrl: './room-comment.component.html',
  styleUrls: ['./room-comment.component.css']
})
export class RoomCommentComponent {
  @Input() User: string = "";
  @Input() Comment: string = "";
  //@Input() Image: string = "";
  @Input() StarNumber: number = 0;
  @Input() Date: {
    day: number,
    month: string,
    year: number
  } = {day: 1, month:"aug", year:2023};

  getNumber(n: number): number[]{
    let array: number[] = [];
    for(let i =0; i< n; i++){
      array.push(i);
    }
    return array;
  }
}
