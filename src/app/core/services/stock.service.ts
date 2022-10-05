import { $locationShim } from '@angular/common/upgrade';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface IStock {
  symbol: string;
  name: string;
  changeToday: string;
  openingPrice: string;
  currentPrice: string;
  highPrice: string;
}

@Injectable()
export class StockService {
  stock: BehaviorSubject<string[]> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('symbol')) || []
  );

  deleteStock(id: string) {
    console.log(id);
    console.log(this.stock);
    localStorage.setItem(
      'symbol',
      JSON.stringify(this.stock.getValue().filter((elem) => elem !== id))
    );
    this.stock.next(this.stock.getValue().filter((elem) => elem !== id));
    // console.log(this.stock.getValue());
  }
}
