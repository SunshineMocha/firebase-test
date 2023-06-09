import { Component } from '@angular/core';
import { Auth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: any
  constructor(public auth: AuthService){
    this.auth.userSubject.subscribe(user => this.user = user);
  }

  logIn(){
    this.auth.signIn();
  }

  logOut(){
    this.auth.signOut();
  }
}
