import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, shareReplay, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
  IStock,
  StockSymbolService,
} from '../../core/services/stock-symbol.service';
import { StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  stocks$: Observable<any>;
  constructor(
    public readonly stockService: StockService,
    public readonly stockSymbolService: StockSymbolService
  ) {}

  ngOnInit() {
    this.stocks$ = this.stockService.stock
      .asObservable()
      .pipe(
        map((symbols) =>
          symbols.map((symbol) => this.stockSymbolService.getDetails(symbol))
        )
      );
  }
}
