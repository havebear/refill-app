import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PersonPage } from '../pages/person/person';
import { FriendPage } from '../pages/friend/friend';
import { BottlePage } from '../pages/bottle/bottle';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistPage } from '../pages/regist/regist';
import { MyBottlePage } from '../pages/my-bottle/my-bottle';
import { ChatRoomPage} from '../pages/chat-room/chat-room';

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
    ChatRoomPage
  ],
  imports: [
    BrowserModule,
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
    ChatRoomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
