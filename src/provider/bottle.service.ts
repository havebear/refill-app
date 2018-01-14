import 'rxjs/add/operator/toPromise'
import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";

import LocalStorageService from '../provider/local-storage.service'

export class Bottle {
    content: string;
    id: number;
    receiveTime: string;
    sendTime: string;
    senderId: number;
    state: number;
    username: string;
}
/**
 * 
 * 
 * @export
 * @class BottleService
 */
@Injectable()
export class BottleService {

    userBottleApi: string = "/drifting-bottles";
    receiversBottlesApi: string = "/drifting-bottles/receivers";
    sendBottlesApi: string = "/drifting-bottles/senders";
    replyBottleApi: string = "/drifting-bottles/reply";
    constructor(private http: HttpClient, private storage: LocalStorageService) { }

    /**
     * 
     * @param content 丢瓶子
     */
    sendBottle(content) {
        return new Promise((resolve, reject) => {
            this.http.post(this.userBottleApi, content).toPromise()
                .then(response => {
                    //alert(response["id"]);
                    resolve(response);
                })
                .catch(response => {
                    //alert(response["id"]);
                    reject(response);
                })

        });
    }

    /**
     * 捞瓶子
     */
    getBottle() {
        return new Promise((resolve, reject) => {
            this.http.get(this.userBottleApi).toPromise().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    /**
     * 获取捞的瓶子列表
     * @param index 
     * @param size 
     */
    getReceiversBottles(index: any = null, size: any = null) {
        return new Promise((resolve, reject) => {
            this.http.get(this.receiversBottlesApi, {
                params: {
                    page: index,
                    size: size
                }
            }).toPromise().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    /**
     * 获取扔的瓶子列表
     * @param index 
     * @param size 
     */
    getSendBottles(index: any = null, size: any = null) {
        return new Promise((resolve, reject) => {
            this.http.get(this.sendBottlesApi, {
                params: {
                    page: index,
                    size: size
                }
            }).toPromise().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    /**
     * 回复瓶子
     * @param id 
     */
    replyBottle(id: number) {
        return new Promise((resolve, reject) => {
            this.http.put(this.replyBottleApi, { path: `/${id}` })
            .toPromise().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }


}