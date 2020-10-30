import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
const stage: string = environment.envName;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
