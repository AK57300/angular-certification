import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StockDetailsService } from '../../core/services/stock-details.service';

export interface StockDetail {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  name: string;
  symbol: string;
  stocks: StockDetail[];

  constructor(
    private route: ActivatedRoute,
    private readonly stockDetailsService: StockDetailsService
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.params.symbol;
    this.getName(this.symbol).subscribe();
    this.stocks = [
      { symbol: 'AAPL', year: 2022, month: 3, change: 1023, mspr: 201 },
      { symbol: 'AAPL', year: 2022, month: 4, change: -1025, mspr: 221 },
      { symbol: 'AAPL', year: 2022, month: 5, change: 1028, mspr: 211 },
    ];

    this.stockDetailsService
      .getStockDetails(this.symbol, '2015-01-01', '2022-03-01')
      .subscribe(console.log);

    //this.stockDetailsService.getStockDetails();
    //this.name.next(this.getName(this.symbol));
    //this.getName(this.symbol);
  }

  getName(symbol: string): Observable<string> {
    return this.stockDetailsService.getNameStock(symbol);
  }
}
