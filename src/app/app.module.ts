import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormSymbolComponent } from './feature/form-symbol/form-symbol.component';
import { ApiService } from './core/data-services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ListViewComponent } from './feature/list-view/list-view.component';
import { CardViewComponent } from './feature/card-view/card-view.component';
import { StockService } from './core/services/stock.service';
import { AppRoutingModule } from './app-routing.module';
import { GlobalViewComponent } from './feature/global-view/global-view.component';
import { StockDetailsService } from './core/services/stock-details.service';
import { DetailViewComponent } from './feature/detail-view/detail-view.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    FormSymbolComponent,
    ListViewComponent,
    CardViewComponent,
    GlobalViewComponent,
    DetailViewComponent,
  ],
  providers: [ApiService, StockService, StockDetailsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
