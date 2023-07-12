import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Renderer2} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() : void {
    const script = this.renderer.createElement('script');
    script.src = '../../../../assets/templateJS/main.js';
    this.renderer.appendChild(document.body, script);
  }
}
