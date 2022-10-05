import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
  IStock,
  StockSymbolService,
} from '../../core/services/stock-symbol.service';
import { StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  stocks: Observable<any>;
  constructor(
    public readonly stockService: StockService,
    public readonly stockSymbolService: StockSymbolService
  ) {}

  ngOnInit() {
    this.stockService.stock.subscribe();
    this.stockSymbolService.newStock.subscribe();
    //this.stockSymbolService.getDetails('AAPL');

    this.stockService.stock
      .asObservable()
      .pipe(map((symbols) => symbols.map((symbol) => this.getDetails(symbol))))
      .subscribe();

    /*this.stockSymbolService.newStock.subscribe((value) => {
      this.stocks = [...this.stocks, value];
    });*/
    //console.log(this.stocks.subscribe((data) => console.log(data)));

    //this.stocks.subscribe((data) => console.log(data));
  }

  getDetails(symbol: string) {
    return this.stockSymbolService.getDetails(symbol);
  }
}
