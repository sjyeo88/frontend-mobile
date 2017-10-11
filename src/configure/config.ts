export class AppConfig {
  password:string
  backServerHost:string
  constructor(){
    this.password = 'test'
    // this.backServerHost = 'http://182.162.104.243:3000'
    this.backServerHost = 'http://192.168.1.3:8080'
  }
}
