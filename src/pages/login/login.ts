import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegistPage } from '../regist/regist';
import { UserInfo, UserInfoService } from '../../provider/userinfo.service';
import VerifyService from '../../provider/verify-service';
import { compareDates } from 'ionic-angular/util/datetime-util';
import { TabsPage } from '../tabs/tabs';
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
  loginBtnText: string = "登录";

  clickFlag: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private userService: UserInfoService,
    private verifyService: VerifyService) {
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
    if (!this.username || !this.password) {
      this.toast("用户名或者密码不能为空");
      return;
    }
    this.clickFlag = true;
    this.loginBtnText = "登录中";
    this.userService.login({ username: this.username, password: this.password }).then(
      res => {
        console.log(res);
        this.clickFlag = false;
        this.toast('登录成功，正在前往首页');
        this.navCtrl.push(TabsPage);
      },
      err => {
        this.clickFlag = false;
        this.toast('登录失败，请检查网络原因');
      });
  }

  /**
   * 消息提示
   * @param str 
   */
  toast(str: string = '') {
    let toast = this.toastCtrl.create({
      message: str,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
