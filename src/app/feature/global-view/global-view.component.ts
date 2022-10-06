import { Component, OnInit } from '@angular/core';
import { filter, map, merge, Observable, of } from 'rxjs';
import { StockService } from '../../core/services/stock.service';
import { IAction, IActionObject, IListStock } from '../shared/model/model';

@Component({
  selector: 'app-global-view',
  templateUrl: './global-view.component.html',
  styleUrls: ['./global-view.component.css'],
})
export class GlobalViewComponent implements OnInit {
  listStocks$: Observable<IListStock[]>;
  constructor(public readonly stockService: StockService) {}

  ngOnInit() {
    let previousCardList: IListStock[] = [];
    const getStockFromLocalStorage: Observable<string[]> = of(
      JSON.parse(localStorage.getItem('symbol')) || []
    );

    const getStockWhenAdded: Observable<IAction> = this.stockService.stock
      .asObservable()
      .pipe(filter((symbol) => Boolean(symbol)));
    this.listStocks$ = merge(getStockFromLocalStorage, getStockWhenAdded).pipe(
      map((symbol: IActionObject | string[]) => {
        if (Array.isArray(symbol)) {
          previousCardList = symbol.map((symbol: string) => ({
            id: symbol,
            details: this.stockService.getDetails(symbol),
          }));
          return previousCardList;
        }
        const indexSymbol = previousCardList.findIndex((item) => {
          return item.id === symbol.data;
        });
        if (symbol.type === 'add') {
          if (indexSymbol !== -1) {
            return previousCardList;
          }
          previousCardList.push({
            id: symbol.data,
            details: this.stockService.getDetails(symbol.data),
          });
        }
        if (symbol.type === 'delete') {
          previousCardList.splice(indexSymbol, 1);
        }
        return previousCardList;
      })
    );
  }

  add(event: string): void {
    this.stockService.stock.next({ data: event, type: 'add' });
  }

  delete(event: string): void {
    this.stockService.stock.next({ data: event, type: 'delete' });
  }
}
