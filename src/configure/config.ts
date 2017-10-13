export class AppConfig {
  password:string
  backServerHost:string
  constructor(){
    this.password = 'test'
    this.backServerHost = 'https://restapt-test.xyz'
    // this.backServerHost = 'http://192.168.1.3:8080'
  }
}
