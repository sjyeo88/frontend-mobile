import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserPage } from '../user/user';
import { SignUpPage} from '../sign-up/sign-up';
import { Platform } from 'ionic-angular'

// Interface import
import { UserAuth }  from '../../interfaces/UserData.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user:UserAuth;
  localData;
  constructor(public nav: NavController,
              public authservice: AuthProvider,
              public alertCtrl: AlertController,
              public platform: Platform) {

  this.authservice.chkLoggedIn().then(chk => {
    if(chk) { this.nav.setRoot(UserPage) }
  })

    this.user = {
      email:'',
      password:'',
    }
  }

  login(user:UserAuth){
    this.authservice.authenticate(user).then(data => {
      if (data) {
        const alert = this.alertCtrl.create({
          title: 'Log-in Successfully',
          subTitle: 'Welcome !!',
          buttons: ['OK']
        });
        this.authservice.loadUserCredentials().then(() => {
         this.nav.setRoot(UserPage);
        })
        alert.present();
      } else {
        const alert = this.alertCtrl.create({
          title: 'Log-in Failed',
          subTitle: 'Sorry Wrong Password or Not registred User.',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  signup(){
    this.nav.push(SignUpPage);
  }
  userPage(){
    this.nav.push(UserPage);
  }
  chkLocalStrage(){
    if(this.platform.is('cordova')) {
      this.authservice.storage.getItem('auth').then(data => {
        this.localData = data
      })
    } else {
      this.localData = window.localStorage.getItem('auth');
    }
  }
}
