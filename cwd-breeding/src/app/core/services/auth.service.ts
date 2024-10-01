import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { UserProfile } from '../models/user/user-profile';
import { UserStatus } from '../constants/user-status.enum';
import { UserCreateModel } from '../models/user/user-create-model';
import { Roles } from '../constants/roles.enum';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  private readonly firestore: Firestore = inject(Firestore);
  private readonly router = inject(Router);
  private readonly userProfileService = inject(UserProfileService);

  // Sign Up with Email and Password
  signUp(userCreateModel: UserCreateModel): Promise<void> {
    return fetchSignInMethodsForEmail(this.auth, userCreateModel.email)
      .then((methods: string[]) => {
        if (methods.length > 0) {
          // If the email is already registered, inform the user
          throw new Error(`An account already exists with the email ${userCreateModel.email}. Please use your existing sign-in method.`);
        }
        // If no accounts exist, proceed with sign up
        return createUserWithEmailAndPassword(this.auth, userCreateModel.email, userCreateModel.password)
          .then((userCredential: UserCredential) => {
            const user = userCredential.user;
            const userProfile: UserProfile = {
              name: userCreateModel.name,
              email: userCreateModel.email,
              phoneNumber: userCreateModel.phoneNumber,
              role: userCreateModel.role,
              uid: user.uid,
              id: user.uid,
              status: UserStatus.ACTIVE,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            return this.createUserProfile(userProfile);
          });
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
        throw error;
      });
  }

  // Google sign-up/login with account exists handling
  signUpWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    
    return signInWithPopup(this.auth, provider)
      .then((result: UserCredential) => {
        const user = result.user;
        const userProfile: UserProfile = {
          name: user.displayName || 'User',
          email: user.email!,
          phoneNumber: user.phoneNumber,
          role: Roles.USER,
          uid: user.uid,
          id: user.uid,
          status: UserStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return this.createUserProfile(userProfile);
      })
      .catch(async (error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const email = error.email;
          const pendingCredential = error.credential;

          // Get sign-in methods associated with the email
          const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);

          // If the user has an email/password account, suggest they log in with email/password
          if (signInMethods.includes('password')) {
            console.error(`An account already exists with this email. Please sign in with email and password, and then link your Google account.`);
          } else {
            console.error('Google sign-in error:', error);
            throw error;
          }
        } else {
          console.error('Error during Google sign-in:', error);
          throw error;
        }
      });
  }

  // Log In with Email and Password
  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
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

  private createUserProfile(userProfile: UserProfile): Promise<void> {
    return this.userProfileService.createUserProfile(userProfile);
  }

  // Get current user as an observable
  get currentUser(): Observable<User | null> {
    return of(this.auth.currentUser);
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.currentUser.pipe(map((user: User | null) => !!user));
  }
}
