import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular'
import { NativeStorage } from '@ionic-native/native-storage'
import * as jwt from 'jwt-simple';
import 'rxjs/add/operator/map';

// Configure import
import { AppConfig }  from '../../configure/config';

// Interface import
import { UserData, UserAuth, UserReg }  from '../../interfaces/UserData.interface';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthProvider {

  AuthToken: string;
  userData: UserData;
  config: AppConfig;
  loggedIn:boolean = false

  constructor(public http: Http,
              public Config: AppConfig,
              public storage: NativeStorage,
              public platform:Platform) {
    console.log('Hello AuthProvider Provider');
    this.http = http;
    this.AuthToken = null
    this.config = Config
  }

  storeUserCredentials(token):void  {
    if (!this.platform.is('cordova')) {
      window.localStorage.setItem('auth', token);
      this.useCredentials(token);
    } else {
      this.storage.setItem('auth', token).then(data => {
        this.useCredentials(data);
      });
    }
  }

  useCredentials(token):void {
    this.AuthToken = token;
    this.loggedIn = true;
  }



  loadUserCredentials() {
    return new Promise(resolve => {
      if (!this.platform.is('cordova')) {
        this.AuthToken = window.localStorage.getItem('auth');
        this.userData =  jwt.decode(this.AuthToken, this.config.password)
        resolve(true)
      } else {
        this.storage.getItem('auth')
        .then(
          data => { this.useCredentials(data) },
          error => { resolve(false) }
        )
        .then(() => {
          this.userData =  jwt.decode(this.AuthToken, this.config.password)
          resolve(true)
        })
      }
    })
  }

  destroyUserCredentials():void {
    this.AuthToken = null;
    this.loggedIn = false;
    this.storage.clear();
    window.localStorage.clear();
  }

  chkLoggedIn():Promise<boolean> {
    return new Promise(resolve => {
      this.loadUserCredentials().then(chk => {
        if(chk) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      })
    })
  }

  authenticate(user:UserAuth): Promise<boolean> {
        var creds = "email=" + user.email+ "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        console.log(this.config.backServerHost)
        return new Promise(resolve => {
            this.http.post('/auth/local',
            creds, {headers: headers}).subscribe(data => {
                console.log(data.json());
                if(data.json().success){
                    this.storeUserCredentials(data.json().token);
                    resolve(true);
                }
                else
                    console.log(data.json().msg)
                    resolve(false);
            });
        });
  }

  adduser(user:UserReg): Promise<boolean> {
        var creds = "email=" + user.email+
                    "&password=" + user.password+
                    "&name=" + user.name;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.post('/auth/local/register',
                creds, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
  }


  logout():void {
        this.destroyUserCredentials();
  }

}
