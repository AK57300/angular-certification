import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
Output,
} from '@angular/core';
import { filter, forkJoin, map, merge, of, shareReplay, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { StockService } from '../../core/services/stock.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  @Input() listStocks;
  @Output() deleteEventEmitter = new EventEmitter<string>;

  constructor() {}

  ngOnInit() {}

  deleteEvent(event: string) {
    this.deleteEventEmitter.emit(event);
  }
}
