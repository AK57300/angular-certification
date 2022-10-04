import { Component, Input, OnInit } from '@angular/core';
import { StockSymbolService } from '../../core/services/stock-symbol.service';
import { StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})
export class CardViewComponent implements OnInit {
  @Input() symbol;
  name: string = 'Alex';
  changeTodayValue: number = 0;
  openingPrice: number = 0;
  currentPrice: number = 0;
  highPrice: number = 0;

  constructor(private readonly stockService: StockService) {}

  ngOnInit() {
    console.log(this.symbol);
    this.name = this.symbol;
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

  clickBtn() {
    console.log(this.name);
  }

  deleteStock(id: string) {
    this.stockService.deleteStock(id);
  }
}
