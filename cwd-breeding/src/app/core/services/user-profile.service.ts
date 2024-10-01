import { inject, Injectable } from '@angular/core';
import { UserProfile } from '../models/user/user-profile';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { Auth, authState, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  firestore = inject(Firestore);
  auth = inject(Auth);

  constructor() {}

  // Create a user profile in Firestore
  createUserProfile(userProfile: UserProfile): Promise<void> {
    const userDocRef = doc(this.firestore, `users/${userProfile.uid}`);
    return setDoc(userDocRef, userProfile);
  }

  // Fetch user profile from Firestore based on current authenticated user
  getUserProfile(): Observable<UserProfile | null> {
    return authState(this.auth).pipe(  // Use authState to observe user login status
      switchMap((user: User) => {
        const uid = user?.uid;  // Use optional chaining to safely access `uid`
        if (uid) {
          const userDocRef = doc(this.firestore, `users/${uid}`);
          return from(getDoc(userDocRef)).pipe(
            map((docSnap) => {
              return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
            })
          );
        } else {
          return of(null);  // No user is logged in
        }
      })
    );
  }
}
