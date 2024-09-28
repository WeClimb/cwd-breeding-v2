import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User as FirebaseUser } from '@angular/fire/auth';
import { UserProfile } from '../models/user-profile';
import { UserStatus } from '../constants/user-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  private readonly firestore: Firestore = inject(Firestore);
  private readonly router = inject(Router);

  // Sign Up with Email and Password
  signUp(email: string, password: string, name: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return this.createUserProfile(user, name);
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
        throw error;
      });
  }

  // Log In with Email and Password
  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
      })
      .catch((error) => {
        console.error('Error during login:', error);
        throw error;
      });
  }

  // Log Out
  logout(): Promise<boolean | void> {
    return this.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  private createUserProfile(user: FirebaseUser, name: string): Promise<void> {
    const userProfile: UserProfile = {
      uid: user.uid,
      name: name,
      email: user.email!,
      phoneNumber: '',  // You can prompt for this during registration
      role: 'user',  // Set default role, e.g., 'user'
      id: user.uid,  // Assuming `id` is the same as `uid`
      status: UserStatus.ACTIVE,  // Set a default status, e.g., 'active'
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return setDoc(userDocRef, userProfile);
  }

  // Get current user as an observable
  get currentUser(): Observable<User | null> {
    return of(this.auth.currentUser);
  }
}
