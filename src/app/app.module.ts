import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {UserModule} from "./user/user.module";
import {ProductData} from "./products/product-data";
import {PageNotFoundComponent} from "./home/page-not-found.component";
import {WelcomeComponent} from "./home/welcome.component";
import {MenuComponent} from "./home/menu.component";
import {ShellComponent} from "./home/shell.component";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({name: 'Demo App', maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
