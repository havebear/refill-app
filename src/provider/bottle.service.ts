import 'rxjs/add/operator/toPromise'
import {HttpClient} from "@angular/common/http";

import {Injectable} from "@angular/core";

import LocalStorageService from '../provider/local-storage.service'

export class Bottle{
    content:string;
    id:number;
    receiveTime:string;
    sendTime:string;
    senderId:number;
    state:number;
}

@Injectable()
export class BottleService{

    userBottleApi:string = "/driftingbottles";
    constructor(private http:HttpClient,private storage:LocalStorageService) {}

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


}