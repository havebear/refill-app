import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'

import { Community } from '../../provider/community'
import { UserInfoService, UserInfo } from '../../provider/userinfo.service'
import { OnInit } from '@angular/core';


@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage implements OnInit {


  userinfo: UserInfo;
  isLogin: boolean;

  ngOnInit(): void {
    this.userInfoService.getMyinfo().then((user: UserInfo) => {
      this.userinfo = user;
      this.isLogin = true;
    }, (error) => {
      alert(error);
      this.isLogin = false;
    });

  }

  constructor(public navCtrl: NavController, private userInfoService: UserInfoService) {
    this.isLogin = false;
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
