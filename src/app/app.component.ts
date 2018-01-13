import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { UserInfoService, UserInfo } from '../provider/userinfo.service'
import LocalStorageService from '../provider/local-storage.service'

declare var JMessage: any
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  userinfo: UserInfo;
  userGetMeInfo: string = "/user";
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: LocalStorageService, private userInfoService: UserInfoService) {
    if (this.storage.get('token')) {
      this.userInfoService.getMyinfo().then((user: UserInfo) => {
        this.userinfo = user;
        this.rootPage = TabsPage;
      }).catch(err => {
        console.log('获取失败');
      });
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      try {
        JMessage.init({ isOpenMessageRoaming: false });
      } catch (e) {
        console.log('极光推送暂不支持桌面浏览器');
      }
    });
  }
}
