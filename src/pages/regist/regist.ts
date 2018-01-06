import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Community} from '../../provider/community'
import { compareDates } from 'ionic-angular/util/datetime-util';

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
  username:string="";
  password:string="";
  clickFlag:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private com:Community) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPage');
  }

  onRegister()
  {
    if(this.clickFlag == true){
      return;
    }
    this.clickFlag = true;
    if(this.username === "" || this.password === ""){
      alert("用户名或者密码不能为空");
      return;
    }
    this.com.register({username:this.username,password:this.password}).then(()=>{
    alert("注册成功");
    this.clickFlag = false;
    },(reason)=>{
      alert(reason);
      this.clickFlag = false;
    });
  }

}
