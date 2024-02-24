import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
