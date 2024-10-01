import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Import your AuthService
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from '../models/user/user-profile';  // Your user profile model
import { UserProfileService } from '../services/user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private userProfileService: UserProfileService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['role'];  // Get the required role from the route data

    return this.userProfileService.getUserProfile().pipe(
      map((userProfile: UserProfile | null) => {
        if (userProfile && userProfile.role === expectedRole) {
          return true;  // User has the correct role, allow access
        } else {
          // User does not have the correct role, redirect to an unauthorized page or home
          this.router.navigate(['/sign-in']);
          return false;
        }
      })
    );
  }
}
