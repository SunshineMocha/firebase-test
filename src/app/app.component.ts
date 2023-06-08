import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore/firestore.service';
import { Videogiochi } from './model/videogiochi';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-test';

  videogames: Videogiochi[] = [];

  constructor(private firestore: FirestoreService, public auth: AuthService){
    this.firestore.getVideogame("8dW6pUiPAoq7cWjRgarc").then(videogioco => console.log(videogioco));

    this.firestore.getVideogames().then(videogiochiFromDb => {
      // for (let i = 0; i < videogiochi.length; i++) {
      //   const element = videogiochi[i];
      //   console.log('collection', element);
      // }
      this.videogames = videogiochiFromDb;
    })
  }
}
