import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StockService {
  stock: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor() {
    this.stock.next(JSON.parse(localStorage.getItem('symbol')));
  }
}
