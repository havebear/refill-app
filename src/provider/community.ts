import 'rxjs/add/operator/toPromise'
import {HttpClient} from "@angular/common/http";
import LocalStorageService from '../provider/local-storage.service'

import {Injectable} from "@angular/core";
import { resolveDefinition } from '@angular/core/src/view/util';

import {UserInfo} from '../provider/userinfo.service'
declare var JMessage: any


@Injectable()
export class Community {

    userRegisterAPI:string  = "/users";
    userLoginAPI:string = "/users/token";
    userGetMeInfo:string = "/user";
    userBottleApi:string = "/driftingbottles";
    

    constructor(private http:HttpClient,private storage:LocalStorageService) {}

    register(user) {
        return new Promise((resolve, reject) => {
            this.http.post(this.userRegisterAPI,user).toPromise()
            .then(response=>{
                resolve();
            })
            .catch(error=>{
                reject(error);
            })
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            JMessage.login(
                user,
                () => {
                         this.http.post(this.userLoginAPI,user).toPromise()
                         .then(response =>{
                             this.storage.set("token",response["token"]);
                             resolve();
                            })
                         .catch(error=>{
                             reject("error");
                            })
                },
                (error) => {
                    reject(error);
                }
            )


        });
    }

    logout() {
        return new Promise((resolv) => {
            JMessage.logout();
            resolv();
        });
    }

    getMyinfo() {
        return new Promise((resolve, reject) => {
            this.http.get(this.userGetMeInfo).toPromise()
            .then(response=>{
                //alert(response["id"]);
                let userinfo = new UserInfo;
                userinfo.createTime = response['createTime'];
                userinfo.email = response['email'];
                userinfo.id = response['id'];
                userinfo.lastLonginTime = response['lastLonginTime'];
                userinfo.nickname = response['nickname'];
                userinfo.phone = response['phone'];
                userinfo.username = response['username']
                resolve(userinfo);
            })
            .catch(error=>{
                
                reject();
            })

        }
        );
    }

    thowBottle(content){
        return new Promise((resolve,reject)=>{
            this.http.post(this.userBottleApi,content).toPromise()
            .then(response=>{
                //alert(response["id"]);
                resolve(response);
            })
            .catch(response=>{
                //alert(response["id"]);
                reject(response);
            })

        });
    }

    getUserInfo(userid) {

        return new Promise((resolv, reject) => {
            JMessage.getUserInfo(
                userid
                ,
                (userinfo) => {
                    resolv(userinfo);

                },
                (error) => {
                    reject(error);
                }
            )

        });

    }

    updateMyPassword(oldpass, newpass) {

        return new Promise((resolve, reject) => {
            JMessage.updateMyPassword({ oldPwd: oldpass, newPwd: newpass },
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }


    createSingleConversation(username){
        return new Promise((resolve,reject)=>{
            JMessage.createConversation(
                {type:"single",username:username},
                (conversation)=>{
                    resolve(conversation);
                },
                (error)=>{
                    reject(error.description);
                }
            );

        });
    }

    //第一次发消息，先调用createSingleConversation
    sendTextMessageByUser(username:string,content:string){
        return new Promise((resolve,reject)=>{
            JMessage.sendTextMessage({type:"single",username:username,text:content},(message)=>{
                resolve();
            },(error)=>{
                reject(error.description);
            });
        });

    }


}