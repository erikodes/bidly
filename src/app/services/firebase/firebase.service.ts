import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private firestore: Firestore) { }

  getAllDocuments(collection_name: string): Observable<any[]> {
    const notes_ref = collection(this.firestore, collection_name);
    return collectionData(notes_ref, { idField: '$key' });
  }

  getRef(collection_name: string) {
    return collection(this.firestore, collection_name);
  }

  getDocument(collection_name: string, id: string): Observable<any> {
    const noteDocRef = doc(this.firestore, `${collection_name}/${id}`);
    return docData(noteDocRef, { idField: '$key' });
  }

  addDocument(collection_name: string, data_obj: any): Promise<any> {
    const notes_ref = collection(this.firestore, collection_name);
    return addDoc(notes_ref, data_obj);
  }

  deleteDocument(collection_name: string, doc_id: string): Promise<void> {
    const noteDocRef = doc(this.firestore, `${collection_name}/${doc_id}`);
    return deleteDoc(noteDocRef);
  }

  updateDocument(collection_name: string, key: string, data_obj: any): Promise<void> {
    const noteDocRef = doc(this.firestore, `${collection_name}/${key}`);
    return updateDoc(noteDocRef, data_obj);
  }

  setDocument(collection_name: string, key: string, data_obj: any): Promise<void> {
    const noteDocRef = doc(this.firestore, `${collection_name}/${key}`);
    return setDoc(noteDocRef, data_obj);
  }
}