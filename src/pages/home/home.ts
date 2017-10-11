import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserPage } from '../user/user';
import { SignUpPage} from '../sign-up/sign-up';

// Interface import
import { UserAuth }  from '../../interfaces/UserData.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  user:UserAuth;
  constructor(public nav: NavController,
              public authservice: AuthProvider,
              public alertCtrl:AlertController) {

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
  // getInfo(){
  //   this.authservice.loadUserCredentials().then(result => {
  //     console.log(this.authservice.userData)
  //   })
  // }
}
