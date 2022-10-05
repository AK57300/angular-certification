import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
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
  stocks$: Observable<any>;
  constructor(
    public readonly stockService: StockService,
    public readonly stockSymbolService: StockSymbolService
  ) {}

  ngOnInit() {
    this.stockService.stock.subscribe();
    this.stockSymbolService.newStock.subscribe();
    //this.stockSymbolService.getDetails('AAPL');

    this.stocks$ = this.stockService.stock.asObservable().pipe();

    this.stockService.stock
      .asObservable()
      .pipe(
        switchMap((symbols) =>
          symbols.map((symbol) => this.stockSymbolService.getDetails(symbol))
        )
      )
      .subscribe();

    /*this.stockSymbolService.newStock.subscribe((value) => {
      this.stocks = [...this.stocks, value];
    });*/
    //console.log(this.stocks.subscribe((data) => console.log(data)));

    //this.stocks.subscribe((data) => console.log(data));
  }
}
