import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HttpClientModule and HTTP_INTERCEPTORS

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpRequestInterceptor } from './http-interceptor.service';
import { ChatHomeComponent } from './components/chat-home/chat-home.component'; // Import your interceptor

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    SignupComponent,
    ChatHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor, // Register your interceptor here
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
