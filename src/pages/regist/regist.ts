import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserInfoService } from '../../provider/userinfo.service';
import VerifyService from '../../provider/verify-service';
import { compareDates } from 'ionic-angular/util/datetime-util';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})
export class RegistPage {
  username: string = "";
  password: string = "";
  clickFlag: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userinfo: UserInfoService, private toastCtrl: ToastController, private verifyService: VerifyService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPage');
  }

  onRegister() {
    console.log(this.clickFlag);
    if (this.clickFlag) {
      return;
    }
    if (!this.username || !this.password) {
      this.toast("用户名或者密码不能为空");
      return;
    }
    if (!this.verifyService.username(this.username)) {
      this.toast('用户名由4-16位字母或数字组成');
      return;
    }
    if (!this.verifyService.password(this.password)) {
      this.toast('密码由6-16位组成');
      return;
    } 
    this.clickFlag = true;
    this.userinfo.register({ username: this.username, password: this.password })
      .then(res => {
        this.clickFlag = false;
        console.log(res);
        this.toast('注册成功');
        this.navCtrl.pop();
      }).catch(err => {
        this.clickFlag = false;
        this.toast(err.error.error);
      })
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
