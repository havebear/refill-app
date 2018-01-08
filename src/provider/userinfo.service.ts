import 'rxjs/add/operator/toPromise'
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import LocalStorageService from '../provider/local-storage.service'

declare var JMessage: any

export class UserInfo{
    username:string;
    createTime:string;
    email:string;
    id:number;
    lastLonginTime:string;
    nickname:string;
    phone:string;
    sex:number;
    
}
@Injectable()
export class UserInfoService{
    
    userRegisterAPI:string  = "/users";
    userLoginAPI:string = "/users/token";
    userGetMeInfo:string = "/user";

    constructor(private http:HttpClient,private storage:LocalStorageService) {}

    register(user) {
        return new Promise((resolve, reject) => {
            this.http.post(this.userRegisterAPI,user).toPromise()
            .then(response=>{
                resolve();
            })
            .catch(error=>{
                reject(error.description);
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
                    reject(error.description);
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
                userinfo.username = response['username'];
                userinfo.sex = response['sex'];
                resolve(userinfo);
            })
            .catch(error=>{
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