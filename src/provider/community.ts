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