import { Component, OnInit } from '@angular/core';
import { filter, map, merge, Observable, of } from 'rxjs';
import { IStock, StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-global-view',
  templateUrl: './global-view.component.html',
  styleUrls: ['./global-view.component.css'],
})
export class GlobalViewComponent implements OnInit {
  stocks$: Observable<any>;
  listStocks$: Observable<any[]>;
  constructor(public readonly stockService: StockService) {}

  ngOnInit() {
    let previousCardList = [];
    const getStockFromLocalStorage = of(
      JSON.parse(localStorage.getItem('symbol')) || []
    );

    const getStockWhenAdded = this.stockService.stock
      .asObservable()
      .pipe(filter((symbol) => Boolean(symbol)));
    this.listStocks$ = this.stocks$ = merge(
      getStockFromLocalStorage,
      getStockWhenAdded
    ).pipe(
      map((symbol: { data: string; type: string } | string[]) => {
        if (Array.isArray(symbol)) {
          previousCardList = symbol.map((symbol) => ({
            id: symbol,
            details: this.stockService.getDetails(symbol),
          }));
          return previousCardList;
        }

        const indexSymbol = previousCardList.findIndex((item) => {
          return item.id === symbol.data;
        });

        console.log(indexSymbol);

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

  add(event: string) {
    this.stockService.stock.next({ data: event, type: 'add' });
  }

  delete(event: string) {
    console.log(event);
    this.stockService.stock.next({ data: event, type: 'delete' });
  }
}
