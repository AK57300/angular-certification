import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, forkJoin, Subject, Observable, map } from 'rxjs';
import {
  IAction,
  IDetails,
  IQuote,
  IStock,
  ISymboles,
  StockDetail,
} from '../../feature/shared/model/model';
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
  }

  getQuote(symbol: string): Observable<IQuote> {
    return this.apiService.getQuote(
      this.configUrl + 'quote?symbol=' + symbol + this.token
    );
  }

  getSymbol(symbol: string): Observable<ISymboles> {
    return this.apiService.getSymbole(
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

  getStockDetails(symbol: string): Observable<StockDetail[]> {
    let currentDate = new Date();
    let dateDebut = new Date(new Date().setMonth(currentDate.getMonth() - 2));
    let dateFinn = new Date(new Date().setMonth(currentDate.getMonth()));
    let datee = formatDate(dateDebut, 'yyyy-MM-dd', 'en');
    let dateFin = formatDate(dateFinn, 'yyyy-MM-dd', 'en');
    return this.apiService
      .getStockDetails(
        this.configUrl +
          '/stock/insider-sentiment?symbol=' +
          symbol +
          '&from=' +
          datee +
          '&to=' +
          dateFin +
          this.token
      )
      .pipe(
        map((data) => {
          let newStocks: StockDetail[] = [];
          for (let i = 0; i < 3; i++) {
            let currentDate = new Date(
              new Date().setMonth(new Date().getMonth() - 2 + i)
            );
            let newStock: StockDetail;
            newStock = data.data.find(
              (data) => data.month === currentDate.getMonth() + 1
            );
            newStock = {
              symbol: newStock?.symbol,
              year: currentDate.getFullYear(),
              month: currentDate.getMonth() + 1,
              change: newStock?.change,
              mspr: newStock?.mspr,
            };
            newStocks.push(newStock);
          }
          return newStocks;
        })
      );
  }
}
