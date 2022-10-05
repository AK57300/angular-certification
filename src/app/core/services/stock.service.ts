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
  stock: BehaviorSubject<string> = new BehaviorSubject(null);

  deleteStock(id: string) {}
}
