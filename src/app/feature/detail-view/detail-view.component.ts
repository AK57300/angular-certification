import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { StockService } from '../../core/services/stock.service';
import { StockDetail } from '../shared/model/model';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  name: BehaviorSubject<string> = new BehaviorSubject(null);
  symbol: string;
  stocks$: Observable<StockDetail[]>;

  constructor(
    private route: ActivatedRoute,
    private readonly stockService: StockService
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.params.symbol;
    this.getName(this.symbol);
    this.stocks$ = this.stockService.getStockDetails(this.symbol);
  }

  getName(symbol: string): Subscription {
    return this.stockService.getSymbol(symbol).subscribe((data) => {
      this.name.next(
        data.result.find((elem) => elem.symbol === symbol)?.description
      );
    });
  }
}
