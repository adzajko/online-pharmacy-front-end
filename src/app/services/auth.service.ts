import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signIn(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
      this.router.navigate(['/catalogue']);
      this.toastr.success('You are now logged in!', 'Success!');
    });
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
      this.toastr.success('You are now logged out!', 'Success!');
    });
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then((res) => {
      res.user.sendEmailVerification();
      this.router.navigate(['/catalogue']);
      this.toastr.success('Thank you for choosing our service!', 'Welcome!');
    });
  }

  resetPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email);
  }

  getCurrentUser() {
    return this.afAuth.user;
  }
}
