import 'rxjs/add/operator/toPromise'
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import LocalStorageService from '../provider/local-storage.service'

declare var JMessage: any

export class UserInfo {
    username: string;
    createTime: string;
    email: string;
    id: number;
    lastLonginTime: string;
    nickname: string;
    phone: string;
    sex: number;

}
@Injectable()
export class UserInfoService {

    userRegisterAPI: string = "/users";
    userLoginAPI: string = "/users/token";
    userGetMeInfo: string = "/user";

    constructor(private http: HttpClient, private storage: LocalStorageService) { }

    register(user) {
        return new Promise((resolve, reject) => {
            this.http.post(this.userRegisterAPI, user).toPromise()
                .then(response => {
                    console.log('注册成功');
                    resolve(response);
                })
                .catch(error => {
                    console.log('注册失败');
                    reject(error);
                })
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            this.http.post(this.userLoginAPI, user)
                .toPromise()
                .then(response => {
                    console.log('本站用户登录成功');
                    this.storage.set("token", response["token"]);
                    resolve(response);
                })
                .catch(error => {
                    console.log('本站用户登录失败');
                    reject(error);
                })
            // 登录极光推送用户
            // JMessage.login(user,
            //     res => {
            //         console.log('极光推送登录成功');
            //         // 登录本站用户
            //         this.http.post(this.userLoginAPI, user).toPromise()
            //             .then(response => {
            //                 console.log('本站用户登录成功');
            //                 this.storage.set("token", response["token"]);
            //                 resolve(response);
            //             })
            //             .catch(error => {
            //                 console.log('本站用户登录失败');
            //                 reject(error);
            //             })
            //     },
            //     error => {
            //         console.log(error);
            //         console.log('极光推送登录失败');
            //         reject(error.description);
            //     }
            // )


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
                .then(response => {
                    //alert(response["id"]);
                    let userinfo = new UserInfo;
                    userinfo.createTime = response['createTime'];
                    userinfo.email = response['email'];
                    userinfo.id = response['id'];
                    userinfo.lastLonginTime = response['lastLonginTime'];
                    userinfo.nickname = response['nickname'];
                    userinfo.phone = response['phone'];
                    userinfo.username = response['username'];
                    userinfo.sex = response['sex'];
                    resolve(userinfo);
                })
                .catch(error => {
                    reject("获取失败");
                })
        }
        );
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
                    reject(error.description);
                }
            )

        });

    }


}