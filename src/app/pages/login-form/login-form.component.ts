import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.sass'
})
export class LoginFormComponent {

  authService = inject(AuthService);
  router = inject(Router);

  public signIn(email: string, password: string) {
    of(this.authService.signWithEmailAndPassword(email, password)).subscribe();
  }

  public async signWithGoogle() {
    await this.authService.signWithGoogle();
    this.router.navigate(['/private']);
  }

}
