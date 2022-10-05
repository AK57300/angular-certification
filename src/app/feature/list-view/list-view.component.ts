import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
import { IStock, StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  stockss: Observable<any>;
  stocks: IStock[] = [];
  constructor(
    public readonly stockService: StockService,
    public readonly stockSymbolService: StockSymbolService
  ) {}

  ngOnInit() {
    this.stockService.stock.subscribe();
    //this.stockSymbolService.getDetails('AAPL');

    this.stockss = this.stockService.stock
      .asObservable()
      .pipe(
        map((symbols) =>
          symbols.map((symbol) => this.stockSymbolService.getDetails(symbol))
        )
      );

    this.stockSymbolService.newStock.subscribe((value) => {
      this.stocks = [...this.stocks, value];
    });
    //this.stocks.subscribe((data) => console.log(data));
    //console.log(this.stocks.subscribe((data) => console.log(data)));
  }

  getDetails(symbol: string) {
    return this.stockSymbolService.getDetails(symbol);
  }
}
