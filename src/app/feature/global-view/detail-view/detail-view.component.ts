import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockDetailsService } from '../../../core/services/stock-details.service';
import { StockDetail } from '../../shared/model/model';

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
    private readonly stockDetailsService: StockDetailsService
  ) {}

  ngOnInit() {
    this.symbol = this.route.snapshot.params.symbol;
    this.getName(this.symbol);
    this.stocks$ = this.stockDetailsService.getStockDetails(this.symbol);
  }

  getName(symbol: string) {
    return this.stockDetailsService.getNameStock(symbol).subscribe((data) => {
      this.name.next(
        data.result.find((elem) => elem.symbol === symbol)?.description
      );
    });
  }
}