import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceColorPipe'
})
export class PriceColorPipe implements PipeTransform {

  transform(price: number): string {
    if(price < 50){
      return `<h3 class="text-danger"> ${price} $<span>/Pernight</span></h3>`;
    }else{
      return `<h3 class="text-dark"> ${price} $<span>/Pernight</span></h3>`;
    }
  }

}
