import { Component } from '@angular/core';

import { PersonPage } from '../person/person';
import { FriendPage } from '../friend/friend';
import { BottlePage } from '../bottle/bottle';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BottlePage;
  tab2Root = FriendPage;
  tab3Root = PersonPage;

  constructor() {

  }
}
