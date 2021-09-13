import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'dashboard', component: DashboardComponent }
      //  { path: '', component: ProductListComponent },
      //  { path: 'product/:productId', component: ProductDetailComponent },
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
