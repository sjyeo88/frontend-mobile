import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

// Interface import
import { UserData }  from '../../interfaces/UserData.interface';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})

export class UserPage {

  user:UserData = this.authservice.authedUser

  constructor(public nav: NavController,
              public navParams: NavParams,
              public authservice: AuthProvider,
             ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }


  logout(): void {
    this.authservice.logout();
    this.nav.setRoot(HomePage);
  }
}
