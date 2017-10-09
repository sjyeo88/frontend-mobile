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

    if(this.authservice.chkLoggedIn()) {
        this.nav.setRoot(UserPage)
    }

    this.user = {
      email:'',
      password:'',
    }
  }

  login(user:UserAuth){
    this.authservice.authenticate(user).then(data => {
      if (data) {
        // const alert = this.alertCtrl.create({
        //   title: 'Log-in Successfully',
        //   subTitle: 'Welcome !!',
        //   buttons: ['OK']
        // });
        // alert.present();
        this.nav.push(UserPage)
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
}
