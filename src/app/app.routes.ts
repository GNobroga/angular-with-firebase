import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { authGuard } from './guards/auth.guard';
import { TodosComponent } from './pages/todos/todos.component';

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
    path: 'todos',
    component: TodosComponent,
    //canActivate: [authGuard]
  },
];
