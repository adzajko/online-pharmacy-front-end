import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  signIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  signOut() {
    return from(this.afAuth.signOut());
  }

  signUp(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  async sendConfirmationEmail() {
    (await this.afAuth.currentUser).sendEmailVerification();
  }

  resetPassword(email: string) {
    return from(
      this.afAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('Password sucessfully changed.');
        })
        .catch((err) => {
          console.log(err.message);
        })
    );
  }

  // Get the User
  getUsername() {
    return from(this.afAuth.currentUser);
  }
}
