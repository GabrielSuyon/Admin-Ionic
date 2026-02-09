import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {User} from '../models/user.model'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(AngularFireAuth);
//============= Acceder
  signIn(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

//================ Crear
  signUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName})
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


  //=========== BASE DE DATOS ===========//

    //== Setear un documento ====
    setDocument(path: string, data: any){
      return setDoc(doc(getFirestore(),path),data);
    }

}
