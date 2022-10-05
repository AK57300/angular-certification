import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockDetailsService } from '../../core/services/stock-details.service';

export interface StockDetail {
  date: string;
  change: string;
  mspr: string;
}

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  //name: BehaviorSubject<string>;
  symbol: string;
  stocks: StockDetail[];

  constructor(
    private route: ActivatedRoute,
    private readonly stockDetailsService: StockDetailsService
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.params.symbol;
    this.stocks = [
      { date: 'Mai 2022', change: '1023', mspr: '201' },
      { date: 'Juin 2022', change: '1025', mspr: '221' },
      { date: 'Juillet 2022', change: '1028', mspr: '211' },
    ];
    //this.name.next(this.getName(this.symbol));
    //this.getName(this.symbol);
  }

  getName(symbol: string) {
    let name: string;
    this.stockDetailsService
      .getNameStock(symbol)
      .subscribe((name) => console.log(name));
    return name;
  }
}
