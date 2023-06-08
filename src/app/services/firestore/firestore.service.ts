import { Injectable } from '@angular/core';

import { initializeApp } from "firebase/app";
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { Videogiochi } from 'src/app/model/videogiochi';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db: Firestore

  constructor(private firebase: FirebaseService){
    this.db = getFirestore(firebase.app)
  }

  getVideogame(id:string):Promise<Videogiochi | null>{
    const docRef = doc(this.db, "videogiochi", id);
    return getDoc(docRef).then(document =>{
      if(document.exists()){
        return {id: document.id, ...document.data()} as Videogiochi;
      } else {
        return null;
      }
    });
  }

  getVideogames(): Promise<Videogiochi[]>{
    const collectionRef = collection(this.db, "videogiochi");
    return getDocs(collectionRef).then(col => {
      return col.docs.map(doc => ({id:doc.id, ...doc.data()} as Videogiochi))
    })
  }
}
