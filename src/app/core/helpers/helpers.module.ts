import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LOCALSTORAGE, LocalStorageService } from './local-storage.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    { provide: LOCALSTORAGE, useValue: localStorage },
    LocalStorageService,
  ],
})
export class HelpersModule {}
