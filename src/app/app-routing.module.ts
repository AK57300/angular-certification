import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './feature/detail-view/detail-view.component';
import { RouterModule, Routes } from '@angular/router';
import { GlobalViewComponent } from './feature/global-view/global-view.component';

const routes: Routes = [
  { path: '', component: GlobalViewComponent },
  {
    path: 'sentiment/:symbol',
    component: DetailViewComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
