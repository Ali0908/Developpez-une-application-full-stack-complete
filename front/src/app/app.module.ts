import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {JwtInterceptor} from "./core/interceptor/jwt.interceptor";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {MatDialogModule} from "@angular/material/dialog";
import {NgOptimizedImage} from "@angular/common";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidenavListComponent } from './shared/components/sidenav-list/sidenav-list.component';




@NgModule({
  declarations: [AppComponent, NavbarComponent, SidenavListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    SidebarModule,
    ButtonModule,
    MatDialogModule,
    NgOptimizedImage,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
