import { $locationShim } from '@angular/common/upgrade';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, forkJoin, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiService } from '../data-services/api.service';

export interface IStock {
  symbol: string;
  name: string;
  changeToday: string;
  openingPrice: string;
  currentPrice: string;
  highPrice: string;
}

export interface IAction {
  data: string;
  type: string;
}

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

  getQuote(symbol: string) {
    return this.apiService.get(
      this.configUrl + 'quote?symbol=' + symbol + this.token
    );
  }

  getSymbol(symbol: string) {
    return this.apiService.get(
      this.configUrl + 'search?q=' + symbol + this.token
    );
  }

  getDetails(symbol: string) {
    return forkJoin({
      symbol: of(symbol),
      resultOne: this.getQuote(symbol),
      resultTwo: this.getSymbol(symbol),
    });
  }

  deleteStock(id: string) {
    let tab: string[];
    tab = JSON.parse(localStorage.getItem('symbol'));
    tab = tab.filter((index) => index !== id);
    localStorage.setItem('symbol', JSON.stringify(tab));
  }
}
