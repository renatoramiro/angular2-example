import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceComponent } from './device/device.component';

import { NoopInterceptor } from './shared/util/noop.interceptor';
import { LoginService } from "app/shared/login/login.service";
import { SingleDeviceComponent } from './single-device/single-device.component';
import { DeviceShowComponent } from './device-show/device-show.component';

let routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'devices/create', component: DeviceComponent },
  { path: 'devices/:id', component: DeviceShowComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DevicesComponent,
    DeviceComponent,
    SingleDeviceComponent,
    DeviceShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
