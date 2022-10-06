import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ApiService } from './core/data-services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { StockService } from './core/services/stock.service';
import { AppRoutingModule } from './app-routing.module';
import { GlobalViewComponent } from './feature/global-view/global-view.component';
import { ConvertMonthPipe } from './feature/shared/pipe/convert-month.pipe';
import { PlusBeforeNumberPipe } from './feature/shared/pipe/plus-before-number.pipe';
import { FormSymbolComponent } from './feature/global-view/form-symbol/form-symbol.component';
import { ListViewComponent } from './feature/global-view/list-view/list-view.component';
import { CardViewComponent } from './feature/global-view/list-view/card-view/card-view.component';
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
    ConvertMonthPipe,
    PlusBeforeNumberPipe,
  ],
  providers: [ApiService, StockService],
  bootstrap: [AppComponent],
})
export class AppModule {}
