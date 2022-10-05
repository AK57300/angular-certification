import { Inject, Injectable, InjectionToken } from '@angular/core';

export const LOCALSTORAGE = new InjectionToken('localstorage');

@Injectable()
export class LocalStorageService {
  constructor(@Inject(LOCALSTORAGE) private readonly localstorage: Storage) {}

  getItem() {}

  setItem() {}
}
