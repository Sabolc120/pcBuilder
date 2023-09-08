import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { OpenerComponent } from './opener/opener.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GpusComponent } from './gpus/gpus.component';
import { MotherboardsComponent } from './motherboards/motherboards.component';
import { HubService } from './hub.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FooterComponent,
    OpenerComponent,
    NavbarComponent,
    GpusComponent,
    MotherboardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [MainPageComponent, GpusComponent, MotherboardsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
