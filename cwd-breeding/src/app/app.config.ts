import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"cwd-breeding",
      "appId":"1:903855531466:web:257be698ca9b37dd4e5b33",
      "storageBucket":"cwd-breeding.appspot.com",
      "apiKey":"AIzaSyDQZnJuI5eZ0hQK8MyIdShUKHy-2eKBgHc",
      "authDomain":"cwd-breeding.firebaseapp.com",
      "messagingSenderId":"903855531466",
      "measurementId":"G-X80FW1LCZM"
      })
    ), 
    provideAuth(() => getAuth()), 
    provideAnalytics(() => getAnalytics()), 
    ScreenTrackingService, 
    UserTrackingService, 
    provideFirestore(() => getFirestore()), 
    provideFunctions(() => getFunctions()), 
    providePerformance(() => getPerformance()), 
    provideStorage(() => getStorage())
  ]
};
