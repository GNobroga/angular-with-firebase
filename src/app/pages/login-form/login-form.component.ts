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

  public async signIn(email: string, password: string) {
    const isSuccess = await this.authService.signWithEmailAndPassword(email, password);
    if (isSuccess) {
      this.router.navigate(['/todos']);
    }

  }

  public async signWithGoogle() {
    await this.authService.signWithGoogle();
    this.router.navigate(['/todos']);
  }

  public async forgotPassword() {
    const email = window.prompt('Insira o e-mail: ');
    if (email) {
      const isSuccess = await this.authService.forgotPassword(email);
      if (isSuccess) {
        window.alert('Um email foi enviado para você');
      } else {
        window.alert('Um erro ocorreu, tente novamente mais tarde!');
      }
      return;
    }

    window.alert('Insira um email');

  }

}
