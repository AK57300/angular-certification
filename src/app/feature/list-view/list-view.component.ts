import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  stocks$: Observable<string[]>;

  constructor(public readonly stockService: StockService) {}

  ngOnInit() {
    this.stockService.stock.subscribe();
  }
}
