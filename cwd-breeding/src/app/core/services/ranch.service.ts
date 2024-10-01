import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { CollectionPaths } from '../constants/collection-paths.enum';
import { RanchModel } from '../models/ranch/ranch';

@Injectable({
  providedIn: 'root'
})
export class RanchService extends FirestoreService<RanchModel> {
  constructor() {
    super(CollectionPaths.RANCHES); // Specify the Firestore collection path
  }

  override postDelete(id: string): void {
    //delete from subcollections
  }

}


