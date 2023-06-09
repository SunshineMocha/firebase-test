import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { Auth, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { Subject } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;

  provider: GoogleAuthProvider;

  // compito: crea header titolo sinistra login destra login appare solo ngif se user=null, altrimenti scompare e fa vedere l'immagine e mail sotto

  userSubject: Subject<any> = new Subject() // username, mail, picture


  constructor(private firebase: FirebaseService, private firestore: FirestoreService) {
    this.auth = getAuth(this.firebase.app);
    this.provider = new GoogleAuthProvider();

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('auth state', user)

        // const uid = user.uid;

        const dbUser = await firestore.getUser(user.uid)

        if(!dbUser){
          await firestore.saveUser(user);
        }

        this.userSubject.next(user)

      } else {
        console.log("no one is logged");

        this.userSubject.next(null);
      }
    });
  }

  signIn(){
    signInWithPopup(this.auth, this.provider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }

  // async logOut() {
  //   try {
  //     await this.auth.signOut();
  //     console.log('Logout successful!');
  //   } catch (error) {
  //     console.log('Error while logging out', error);
  //   }
  // }

  signOut() {
   signOut(this.auth)
   .then(result => console.log(result))
  }


}

