import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';
import { Roles } from './core/constants/roles.enum';
import { RoleGuard } from './core/guards/role-guard.service';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
        loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent),
        data: {
            title: 'Home | CWD-Breeding',
            meta: [
                { name: 'description', content: '' },
                { name: 'keywords', content: '' }
            ]
        }
    },
    { 
        path: 'register', 
        loadComponent: () => import('./pages/register/register.component').then(mod => mod.RegisterComponent),
        data: {
            title: 'Register | CWD-Breeding',
            meta: [
                { name: 'description', content: '' },
                { name: 'keywords', content: '' }
            ]
        }
    },
    {
        path: 'sign-in',
        loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent),
        data: {
            title: 'Sign In | CWD-Breeding',
            meta: [
                { name: 'description', content: '' },
                { name: 'keywords', content: '' }
            ]
        }
    },
    { 
        path: 'admin-dashboard',
        canActivate: [AuthGuard, RoleGuard],    
        loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(mod => mod.AdminDashboardComponent),
        data: {
            role: Roles.ADMIN,
            title: 'Admin Dashboard | CWD-Breeding',
            meta: [
                { name: 'description', content: '' },
                { name: 'keywords', content: '' },
            ]
        }
    },
    {
        path: 'email-verification',
        loadComponent: () => import('./pages/email-verification/email-verification.component').then(mod => mod.EmailVerificationComponent),
        data: {
            title: 'Email Verification | CWD-Breeding',
            meta: [
                { name: 'description', content: '' },
                { name: 'keywords', content: '' }
            ]
        }
    },
];
