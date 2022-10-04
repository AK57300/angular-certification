import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
import { StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  stocks: Subscription;
  constructor(
    public readonly stockService: StockService,
    public readonly stockSymbolService: StockSymbolService
  ) {}

  ngOnInit() {
    //console.log('ok');
    this.stockService.stock.subscribe();
    this.stockSymbolService.getDetails('AAPL');
    this.stockSymbolService.newStock.subscribe();

    /*this.stocks = this.stockService.stock.asObservable().subscribe((stock) => {
      stock.map((symbol) => {
        console.log(symbol);
        this.stockSymbolService.getDetails(symbol);
        console.log(this.stockSymbolService.newStock.getValue());
      });
      //console.log(stock);
    });*/

    /*this.stockSymbolService.getQuote(this.symbol).subscribe((quote) => {
      this.changeTodayValue = quote.c;
      this.openingPrice = quote.o;
      this.currentPrice = quote.pc;
      this.highPrice = quote.h;
    });

    this.stockSymbolService.getSymbol(this.symbol).subscribe((quote) => {
      this.name = quote.result[0].description;
    });*/
  }
}
