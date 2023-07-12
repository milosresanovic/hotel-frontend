import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import {PriceColorPipe} from "../pipes/price/price-color-pipe.pipe";


@NgModule({
  declarations: [PriceColorPipe],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [PriceColorPipe]
})
export class SharedModule { }
