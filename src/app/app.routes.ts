import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { PrivateComponent } from './pages/private/private.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [authGuard]
  },
];
