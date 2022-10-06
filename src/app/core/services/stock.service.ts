import { Injectable } from '@angular/core';
import { BehaviorSubject, of, forkJoin, Subject, Observable } from 'rxjs';
import {
  IAction,
  IDetails,
  IQuote,
  IStock,
  ISymboles,
} from '../../feature/model/model';
import { ApiService } from '../data-services/api.service';

@Injectable()
export class StockService {
  stock: Subject<IAction> = new Subject();

  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  newStock: BehaviorSubject<IStock> = new BehaviorSubject(null);

  constructor(private readonly apiService: ApiService) {}

  sendSymbolToLocalStorage(formValue: Partial<{ symbolStock: string }>): void {
    let tab: string[];
    tab = JSON.parse(localStorage.getItem('symbol'));
    tab.push(formValue['symbolStock']);
    localStorage.setItem('symbol', JSON.stringify(tab));
    //this.stock.next({ data: formValue['symbolStock'], type: '' });
  }

  getQuote(symbol: string): Observable<IQuote> {
    return this.apiService.get(
      this.configUrl + 'quote?symbol=' + symbol + this.token
    );
  }

  getSymbol(symbol: string): Observable<ISymboles> {
    return this.apiService.get(
      this.configUrl + 'search?q=' + symbol + this.token
    );
  }

  getDetails(symbol: string): Observable<IDetails> {
    return forkJoin({
      symbol: of(symbol),
      resultOne: this.getQuote(symbol),
      resultTwo: this.getSymbol(symbol),
    });
  }

  deleteStock(id: string): void {
    let tab: string[];
    tab = JSON.parse(localStorage.getItem('symbol'));
    tab = tab.filter((index) => index !== id);
    localStorage.setItem('symbol', JSON.stringify(tab));
  }
}
