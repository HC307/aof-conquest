import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {reducers} from './domain/store/reducers';
import {storageMetaReducer} from './domain/store/storage.meta-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(reducers, {
      metaReducers: [storageMetaReducer]
    }),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })]
};
