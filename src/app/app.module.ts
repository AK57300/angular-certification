import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormSymbolComponent } from './feature/form-symbol/form-symbol.component';
import { StockSymbolService } from './core/services/stock-symbol.service';
import { ApiService } from './core/data-services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ListViewComponent } from './feature/list-view/list-view.component';
import { CardViewComponent } from './feature/card-view/card-view.component';
import { StockService } from './core/services/stock.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    FormSymbolComponent,
    ListViewComponent,
    CardViewComponent,
  ],
  providers: [StockSymbolService, ApiService, StockService],
  bootstrap: [AppComponent],
})
export class AppModule {}
