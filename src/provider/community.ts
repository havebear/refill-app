import 'rxjs/add/operator/toPromise'
import {HttpClient} from "@angular/common/http";
import LocalStorageService from '../provider/local-storage.service'

import {Injectable} from "@angular/core";
import { resolveDefinition } from '@angular/core/src/view/util';

declare var JMessage: any


@Injectable()
export class Community {

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
                reject(error['error']);
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
                             reject(error);
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
                alert(response["id"]);
                resolve(response);
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


}