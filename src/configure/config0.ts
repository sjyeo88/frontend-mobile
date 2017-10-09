export class AppConfig {
  password:string
  backServerHost:string
  backServerPort:string
  constructor(){
    this.password = 'test'
    this.backServerHost = 'http://192.168.1.3:8080'
  }
}
