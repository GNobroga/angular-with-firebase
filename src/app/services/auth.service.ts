import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #auth = inject(Auth)

  public async signWithEmailAndPassword(email: string, password: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.#auth, email, password);
      console.log(credential.user);
    } catch (error) {
      console.log(error);
    }
  }

  public async signWithGoogle() {
    try {
     const googleProvider = new GoogleAuthProvider();
     const credential = await signInWithPopup(this.#auth, googleProvider);
     console.log(credential.user)
    } catch (error) {
      console.log(error);
    }
  }

  public async signOut() {
    try {
      await signOut(this.#auth);
    } catch (error) {
      console.log(error);
    }
  }
}
