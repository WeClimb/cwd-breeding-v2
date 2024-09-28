import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc, deleteDoc, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { BaseDataModel } from '../models/base-model';
import { CollectionPaths } from '../constants/collection-paths.enum';

@Injectable({
  providedIn: 'root'
})
export abstract class FirestoreService<T extends BaseDataModel> {
  protected readonly firestore: Firestore = inject(Firestore);

  constructor(protected collectionPath: CollectionPaths) {}

  // Create a document
  createDocument(data: T): Observable<DocumentReference<T>> {
    return from(this.createDocumentPromise(data));
  }

  private async createDocumentPromise(data: T): Promise<DocumentReference<T>> {
    try {
      const docRef = await addDoc(this.getCollection(), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  }

  // Get a single document by ID
  getById(id: string): Observable<T | undefined> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return from(getDoc(docRef).then(snapshot => {
      const data = snapshot.data() as T;
      if (data) {
        return { ...data, id } as T;
      }
      return undefined;
    }));
  }

  // Get all documents, possibly with filtering
  getAll(): Observable<T[]> {
    return collectionData(this.getCollection(), { idField: 'id' }) as Observable<T[]>;
  }

  // Update a document by ID
  updateDocument(id: string, data: Partial<T>): Observable<void> {
    return from(this.updateDocumentPromise(id, data));
  }

  private async updateDocumentPromise(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
  }

  // Delete a document by ID
  deleteDocument(id: string): Observable<void> {
    return from(this.deleteDocumentPromise(id));
  }

  private async deleteDocumentPromise(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return deleteDoc(docRef);
  }

  // Get the reference to the collection
  private getCollection(): CollectionReference<T> {
    return collection(this.firestore, this.collectionPath) as CollectionReference<T>;
  }
}
