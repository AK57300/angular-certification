import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
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
    this.stockSymbolService.getDetails('AAPL');
    this.stockSymbolService.newStock.subscribe();

    /*this.stocks = this.stockService.stock.asObservable().pipe(
      map((symbols) =>
        symbols.map(
          (symbol) => console.log(symbol)
          //this.stockSymbolService.getDetails(symbol)
          //this.stockSymbolService.getDetails(symbol);
        )
      )
    );*/

    //console.log(this.stocks.subscribe((data) => console.log(data)));
  }

  getDetails(symbol: string) {
    return this.stockSymbolService.getDetails(symbol);
  }
}
