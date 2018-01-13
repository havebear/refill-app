import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ChatRoomPage } from '../chat-room/chat-room';

@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html'
})
export class FriendPage {

  constructor(public navCtrl: NavController) {

  }

  toChatRoom() {
    // alert('点击被触发');
    this.navCtrl.push(ChatRoomPage);
  }
}
