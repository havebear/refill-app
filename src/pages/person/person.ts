import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {

  constructor(public navCtrl: NavController) {

  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
