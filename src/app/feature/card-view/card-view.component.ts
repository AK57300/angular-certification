import { Component, Input, OnInit } from '@angular/core';
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
    //console.log(this.symbol);
    //this.name = this.symbol;
  }

  deleteStock(id: string) {
    this.stockService.deleteStock(id);
  }
}
