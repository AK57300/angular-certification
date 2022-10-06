import {
  Component,
  EventEmitter,
  Input,
  OnInit,
Output,
} from '@angular/core';
import { IListStock } from '../shared/model/model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  @Input() listStocks: IListStock[];
  @Output() deleteEventEmitter = new EventEmitter<string>;

  constructor() {}

  ngOnInit() {}

  deleteEvent(event: string) {
    this.deleteEventEmitter.emit(event);
  }
}
