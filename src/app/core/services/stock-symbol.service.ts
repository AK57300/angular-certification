import { Injectable } from '@angular/core';
import { ApiService } from '../data-services/api.service';
import { StockService } from './stock.service';
import { BehaviorSubject, forkJoin } from 'rxjs';

export interface IStock {
  name: string;
  changeToday: string;
  openingPrice: string;
  currentPrice: string;
  highPrice: string;
}

@Injectable()
export class StockSymbolService {
  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  newStock: BehaviorSubject<IStock> = new BehaviorSubject(null);

  constructor(
    private readonly apiService: ApiService,
    private readonly stockService: StockService
  ) {}

  sendSymbolToLocalStorage(formValue: Partial<{ symbolStock: string }>): void {
    let tab: string[] = JSON.parse(localStorage.getItem('symbol')) || [];
    tab.push(formValue['symbolStock']);
    localStorage.setItem('symbol', JSON.stringify(tab));
    this.stockService.stock.next(tab);
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
    forkJoin({
      resultOne: this.getQuote(symbol),
      resultTwo: this.getSymbol(symbol),
    }).subscribe((data) => {
      this.newStock.next({
        name: data.resultTwo.result.find((sym) => sym.symbol == symbol)
          .description,
        changeToday: data.resultOne.d,
        openingPrice: data.resultOne.o,
        currentPrice: data.resultOne.c,
        highPrice: data.resultOne.h,
      });

      console.log(this.newStock.getValue());
    });
  }
}
