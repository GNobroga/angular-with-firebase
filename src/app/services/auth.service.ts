import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, User, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #auth = inject(Auth)
  currentUser: User | null = null;
  router = inject(Router);

  public async signWithEmailAndPassword(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(this.#auth, email,  password);
      this.currentUser = credential.user;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async signWithGoogle() {
    try {
     const googleProvider = new GoogleAuthProvider();
     const credential = await signInWithPopup(this.#auth, googleProvider);
     this.currentUser = credential.user;
    } catch (error) {
      console.log(error);
    }
  }

  public async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.#auth, email);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async signOut() {
    try {
      await signOut(this.#auth);
      this.currentUser = null;
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
