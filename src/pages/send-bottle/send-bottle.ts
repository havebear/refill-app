import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
    public viewCtrl: ViewController,
    public http: HttpClient,
    public toastCtrl: ToastController) {
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
    this.http.post('driftingbottles', { content: this.submitData.content }
    ).subscribe(
      res => {
        this.presentToast('扔出去啦~');
        this.closeModal();
      },
      err => {
        this.presentToast('没扔出去，在试试~');
      }
      )
  }

  /**
   * 
   * @param msg 提示消息
   */
  presentToast(msg: string = ' ') {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendBottlePage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
