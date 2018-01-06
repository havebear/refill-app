import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SendBottlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-bottle',
  templateUrl: 'send-bottle.html',
})
export class SendBottlePage {

  // content为空时，不允许提交，无填充
  isContent: Boolean = true;
  // 提交按钮内容
  submitBtnText: string = '扔海里';

  // 提交的数据
  submitData: { content: string } = { content: '' }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  /**
   * content发生变化时触发
   * @param e 输入内容
   */
  checkContent(e) {
    this.isContent = e.length <= 0 ? true : false;
  }


  /**
   * 提交漂流瓶
   * @memberof SendBottlePage
   */
  submit() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendBottlePage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
