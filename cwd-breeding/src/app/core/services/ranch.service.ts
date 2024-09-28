import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { RanchModel } from '../models/ranch';
import { CollectionPaths } from '../constants/collection-paths.enum';

@Injectable({
  providedIn: 'root'
})
export class RanchService extends FirestoreService<RanchModel> {
  constructor() {
    super(CollectionPaths.RANCHES); // Specify the Firestore collection path
  }
}
