import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatHomeComponent } from './components/chat-home/chat-home.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'chat', component: ChatHomeComponent, canActivate: [AuthGuard] }, 
  { path: 'chat/:slug', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
