import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})
export class CardViewComponent implements OnInit {
  @Input() stock;
  symbol: string;
  name: string;
  changeTodayValue: number;
  openingPrice: number;
  currentPrice: number;
  highPrice: number;

  constructor(private readonly stockService: StockService) {}

  ngOnInit() {
    this.symbol = this.stock.symbol;
    this.name = this.stock.resultTwo.result.find(
      (data) => data.symbol === this.symbol
    ).description;
    this.changeTodayValue = this.stock.resultOne.dp;
    this.openingPrice = this.stock.resultOne.o;
    this.currentPrice = this.stock.resultOne.c;
    this.highPrice = this.stock.resultOne.h;
  }

  deleteStock(id: string) {
    console.log(id);
    this.stockService.deleteStock(id);
  }
}
