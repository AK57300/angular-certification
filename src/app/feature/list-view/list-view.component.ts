import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { forkJoin, map, merge, of, shareReplay, switchMap } from 'rxjs';
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
    let previousCardList = [];
    const getStockFromLocalStorage = of(JSON.parse(localStorage.getItem('symbol')) || []);
    

    this.stocks$ = merge(getStockFromLocalStorage).pipe(map((symbol : string | string[]) => {
      if(Array.isArray(symbol)){
        previousCardList = symbol.map(symbol => this.stockSymbolService.getDetails(symbol));
        return previousCardList;
      }

    }));
  }
}
