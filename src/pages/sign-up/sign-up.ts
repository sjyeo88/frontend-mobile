import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  user = {
    email: '',
    password: '',
    name: '',
  }


  constructor(public nav: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public authservice: AuthProvider,
             ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signup(user){
    this.authservice.adduser(user).then(data => {
      if(data) {
          const alert = this.alertCtrl.create({
            title: 'Registered Successfully',
            subTitle: 'Successfully Registered',
            buttons: ['OK']
          });
          alert.present();
          this.nav.push(HomePage)
      } else {
          const alert = this.alertCtrl.create({
            title: 'Register Fail',
            subTitle: 'Sorry, Register Failed',
            buttons: ['OK']
          });
          alert.present();
      }
    });
  }
}
