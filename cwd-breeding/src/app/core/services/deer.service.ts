import { inject, Injectable } from '@angular/core';
import { DeerModel } from '../models/deer/deer-model';
import { FirestoreService } from './firestore.service';
import { CollectionPaths } from '../constants/collection-paths.enum';
import { RanchService } from './ranch.service';

@Injectable({
  providedIn: 'root'
})
export class DeerService extends FirestoreService<DeerModel> {
  ranchService: RanchService = inject(RanchService);

  constructor() {
    super(CollectionPaths.DEER);
  }

  override postDelete(id: string): void {
    //delete from subcollections
  }
}
