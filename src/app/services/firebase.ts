import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  //============= Autenticación =============//
  
  signIn(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async updateUser(displayName: string) {
    const user = await this.auth.currentUser;
    if (user) {
      return user.updateProfile({ displayName });
    }
    return Promise.reject('No user logged in');
  }

  sendRecoveryEmail(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  signOut() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getAuthState() {
    return this.auth.authState;
  }

  //============= Base de datos =============//

  setDocument(path: string, data: any) {
    return this.firestore.doc(path).set(data);
  }

  getDocument(path: string) {
    return this.firestore.doc(path).get().toPromise();
  }

  updateDocument(path: string, data: any) {
    return this.firestore.doc(path).update(data);
  }

  deleteDocument(path: string) {
    return this.firestore.doc(path).delete();
  }

  getCollection(path: string) {
    return this.firestore.collection(path).valueChanges();
  }

  addToCollection(path: string, data: any) {
    return this.firestore.collection(path).add(data);
  }
}