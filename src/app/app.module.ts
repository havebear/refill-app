import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { Interceptor } from '../provider/Interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { PersonPage } from '../pages/person/person';
import { FriendPage } from '../pages/friend/friend';
import { BottlePage } from '../pages/bottle/bottle';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistPage } from '../pages/regist/regist';
import { MyBottlePage } from '../pages/my-bottle/my-bottle';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { SendBottlePage } from '../pages/send-bottle/send-bottle';

import  LocalStorageService from '../provider/local-storage.service'
import {Community} from '../provider/community'
import {UserInfoService} from '../provider/userinfo.service'
import {BottleService} from '../provider/bottle.service'
import {FriendService} from '../provider/friend.service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FriendPage,
    PersonPage,
    BottlePage,
    TabsPage,
    LoginPage,
    RegistPage,
    MyBottlePage,
    ChatRoomPage,
    SendBottlePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',  // ionic3隐藏全部子页面tabs
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FriendPage,
    PersonPage,
    BottlePage,
    TabsPage,
    LoginPage,
    RegistPage,
    MyBottlePage,
    ChatRoomPage,
    SendBottlePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    LocalStorageService,
    Community,
    UserInfoService,
    FriendService,
    BottleService,

  ]
})
export class AppModule { }
