import { Auth, signInWithEmailAndPassword,createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, sendEmailVerification, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { UserProfile } from '../models/user/user-profile';
import { UserCreateModel } from '../models/user/user-create-model';
import { Roles } from '../constants/roles.enum';
import { UserProfileService } from './user-profile.service';
import { inject, Injectable } from '@angular/core';
import { Status } from '../constants/status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly userProfileService = inject(UserProfileService);

  // Sign Up with Email and Password and send email verification
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
              status: Status.ACTIVE,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            // Create user profile in Firestore
            return this.createUserProfile(userProfile)
              .then(() => {
                // Send email verification
                return sendEmailVerification(user);
              });
          });
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
        throw error;
      });
  }

  signUpWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(async (result: UserCredential) => {
        const user = result.user;
  
        // Check if user profile already exists
        const userDoc = this.userProfileService.getUserProfile().subscribe((userProfile: UserProfile | null) => {
          if (userProfile) {
            console.log('User profile already exists. Skipping profile creation.');
            return;
          } else {
            const userProfile: UserProfile = {
              name: user.displayName || 'User',
              email: user.email!,
              phoneNumber: user.phoneNumber,
              role: Roles.USER,
              uid: user.uid,
              id: user.uid,
              status: Status.ACTIVE,
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            this.createUserProfile(userProfile).then(() => {
              if (!user.emailVerified) {
                return sendEmailVerification(user);
              } else {
                return Promise.resolve();
              }
          });
        }
      });
    });
  }

  signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
  
    return signInWithPopup(this.auth, provider)
      .then((result: UserCredential) => {
        const user = result.user;
        console.log('User signed in with Google:', user);
        return Promise.resolve();
      })
      .catch(error => {
        console.error('Error during Google sign-in:', error);
        throw error;
      });
  }
  

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log('User logged in successfully');
        } else {
          console.warn('Email not verified. Please check your inbox and verify your email.');
          this.router.navigate(['/email-verification']);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        throw error;
      });
  }

  resendEmailVerification(): Promise<void> {
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      return sendEmailVerification(user)
        .then(() => {
          console.log('Verification email resent');
        })
        .catch((error) => {
          console.error('Error resending verification email:', error);
        });
    } else {
      return Promise.reject('No user logged in or email already verified.');
    }
  }

  checkEmailVerification(): boolean {
    const user = this.auth.currentUser;
    if (user) {
      return user.emailVerified;
    } else {
      return false;
    }
  }

  logout(): Promise<boolean | void> {
    return this.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  private createUserProfile(userProfile: UserProfile): Promise<void> {
    return this.userProfileService.createUserProfile(userProfile);
  }

  get currentUser(): Observable<User | null> {
    return of(this.auth.currentUser);
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser.pipe(map((user: User | null) => !!user));
  }
}
