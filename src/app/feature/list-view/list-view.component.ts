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
  //stocks: Subscription;
  constructor(public readonly stockService: StockService) {}

  ngOnInit() {
    this.stockService.stock.subscribe();
    /*this.stocks = this.stockService.stock.asObservable().subscribe((stock) => {
      stock.map((symbol) => {
        console.log(symbol);
        forkJoin([
          this.stockSymbolService.getQuote(symbol).subscribe((quote) => {
            console.log(quote);
          }),
          this.stockSymbolService.getSymbol(symbol).subscribe((sym) => {
            console.log(sym);
          }),
        ]).subscribe(() => {
          console.log('fini');
        });
      });
      console.log(stock);
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
