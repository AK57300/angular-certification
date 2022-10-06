import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlobalViewComponent } from './feature/global-view/global-view.component';
import { DetailViewComponent } from './feature/detail-view/detail-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: GlobalViewComponent },
  {
    path: 'sentiment/:symbol',
    component: DetailViewComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
