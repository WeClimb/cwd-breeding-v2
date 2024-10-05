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
 
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userProfileService: UserProfileService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['role']; 

    return this.userProfileService.getUserProfile().pipe(
      map((userProfile: UserProfile | null) => {
        if (userProfile && userProfile.role === expectedRole) {
          return true; 
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
