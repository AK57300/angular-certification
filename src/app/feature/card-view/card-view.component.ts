import { Component, Input, OnInit } from '@angular/core';
import { StockSymbolService } from '../../core/services/stock-symbol.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})
export class CardViewComponent implements OnInit {
  @Input() symbol;
  name: string;
  changeTodayValue: number;
  openingPrice: number;
  currentPrice: number;
  highPrice: number;

  constructor(private readonly stockSymbolService: StockSymbolService) {}

  ngOnInit() {
    this.stockSymbolService.getQuote(this.symbol).subscribe((quote) => {
      this.changeTodayValue = quote.c;
      this.openingPrice = quote.o;
      this.currentPrice = quote.pc;
      this.highPrice = quote.h;
    });

    this.stockSymbolService.getSymbol(this.symbol).subscribe((quote) => {
      this.name = quote.result[0].description;
    });
  }

  clickBtn() {
    console.log(this.name);
  }
}
