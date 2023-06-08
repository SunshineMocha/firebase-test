import { Injectable } from '@angular/core';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyAiBAmpZRfmHqEYfZ2mHH4Ec8x9RPcOjZA",
    authDomain: "superprogettosuperfico.firebaseapp.com",
    projectId: "superprogettosuperfico",
    storageBucket: "superprogettosuperfico.appspot.com",
    messagingSenderId: "1039024366373",
    appId: "1:1039024366373:web:5a3f1ae50793aa082cb0cc"
  };

  app = initializeApp(this.firebaseConfig);

  constructor() { }
}
