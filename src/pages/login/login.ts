import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegistPage } from '../regist/regist';
import { UserInfo,UserInfoService } from '../../provider/userinfo.service'
import { compareDates } from 'ionic-angular/util/datetime-util';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "";
  password: string = "";

  clickFlag: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private userService:UserInfoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  regist() {
    this.navCtrl.push(RegistPage);
  }

  onLogin() {
    if (this.clickFlag == true) {
      return;
    }

    this.clickFlag = true;
    if (this.username === "" || this.password === "") {
      alert("用户名或者密码不能为空");
      return;
    }
    this.userService.login({ username: this.username, password: this.password }).then(
      () => {
        alert("登录成功");
        this.clickFlag = false;
      },
      (reason) => {
        alert("登录失败");
        this.clickFlag = false;
      });

  }

}
