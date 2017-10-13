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
  authedUser: UserData;
  config: AppConfig;

  constructor(public http: Http,
              public Config: AppConfig,
              public storage: NativeStorage,
              public platform:Platform) {

    console.log('Hello AuthProvider');
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
  }



  loadUserCredentials() {
    return new Promise(resolve => {
      if (!this.platform.is('cordova')) {
        this.AuthToken = window.localStorage.getItem('auth');
        if(this.AuthToken) {
          this.authedUser =  jwt.decode(this.AuthToken, this.config.password)
          resolve(true)
        } else {
          resolve(false)
        }
      } else {
        this.storage.getItem('auth')
        .then(
          data => { this.useCredentials(data) },
          error => { resolve(false) }
        )
        .then(() => {
        if(this.AuthToken) {
            this.authedUser =  jwt.decode(this.AuthToken, this.config.password)
          }
          resolve(true)
        })
      }
    })
  }

  destroyUserCredentials():void {
    this.AuthToken = null;
    this.storage.clear();
    window.localStorage.clear();
  }

  chkLoggedIn():Promise<boolean> {
    return new Promise(resolve => {
      this.loadUserCredentials().then(chk => {
        if(chk) {
          resolve(chk)
        } else {
          resolve(chk)
        }
      })
    })
  }

  authenticate(user:UserAuth): Promise<boolean> {
        var creds = "email=" + user.email+ "&password=" + user.password;
        var headers = new Headers();
        let apiUrl:string
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            if(this.platform.is('cordova')) {
              apiUrl = this.config.backServerHost + '/auth/local'
            }
            else {
              apiUrl = '/auth/local'
            }
            this.http.post(apiUrl,
            creds, {headers: headers}).subscribe(data => {
                console.log(data.toString());
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
        let apiUrl:string;
        let creds:string = "email=" + user.email+
                    "&password=" + user.password+
                    "&name=" + user.name;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            if(this.platform.is('cordova')) {
              apiUrl = this.config.backServerHost + '/auth/local/register'
            }
            else {
              apiUrl = '/auth/local/register'
            }
            this.http.post(apiUrl,
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
