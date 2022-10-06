import { Observable } from 'rxjs/internal/Observable';

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

export interface IQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface ISymbole {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface ISymboles {
  count: number;
  result: ISymbole[];
}

export interface IDetails {
  symbol: string;
  resultOne: IQuote;
  resultTwo: ISymboles;
}

export interface ISentiment {
  resultOne: ISymboles;
  resultTwo: StockDetail[];
}

export interface StockDetail {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}

export interface IStockDetails {
  data: StockDetail[];
  symbol: string;
}

export interface IListStock {
  id: string;
  details: Observable<IDetails>;
}

export interface IActionObject {
  data: string;
  type: string;
}
