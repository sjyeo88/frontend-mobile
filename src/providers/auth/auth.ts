import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NativeStorage } from 'ionic-native'
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
  config: AppConfig;

  constructor(public http: Http, Config: AppConfig) {
    console.log('Hello AuthProvider Provider');
    this.http = http;
    this.AuthToken = null
    this.config = Config
  }

  storeUserCredentials(token):void  {
    window.localStorage.setItem('auth', token);
    NativeStorage.setItem('auth', token);
    this.useCredentials(token);
  }

  useCredentials(token):void {
    this.AuthToken = token;
  }

  loadUserCredentials():string {
    var token = window.localStorage.getItem('auth');
    if (!token) {
      NativeStorage.getItem('auth').then(data => {
       token = data;
      });
    }

    this.useCredentials(token);
    return token;
  }

  destroyUserCredentials():void {
    this.AuthToken = null;
    NativeStorage.clear();
    window.localStorage.clear();
  }

  chkLoggedIn():boolean {
    let token = this.loadUserCredentials()
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  authenticate(user:UserAuth): Promise<boolean> {
        var creds = "email=" + user.email+ "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            this.http.post(this.config.backServerHost + '/auth/local',
            creds, {headers: headers}).subscribe(data => {
                console.log(data.json());
                if(data.json().success){
                    console.log(data.json().msg)
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
            this.http.post(this.config.backServerHost + '/auth/local',
                creds, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
  }

  getinfo():UserData {
        let encodedInfo = this.loadUserCredentials();
        let decodedInfo = jwt.decode(encodedInfo, this.config.password);
        return decodedInfo;
  }

  logout():void {
        this.destroyUserCredentials();
  }
}
