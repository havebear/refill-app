import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import LocalStorageService from '../provider/local-storage.service'
@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private storage: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('已经被拦截处理了');
    // 公网
    const baseUrl = 'http://114.67.133.63:8081';
    // 内网
    // const baseUrl = 'http://192.168.0.105';
    const url: string = baseUrl + req.url;
    let token: string = '';
    console.log(url);
    let tokentemp: string = this.storage.get("token");
    if (tokentemp != null) {
      token = tokentemp
    }
    // 由于请求都是不可变的，所以不能直接修改他们
    // 要想修改，就是用clone()函数
    // 传给clone()函数的哈希对象可以让我们在复制的时候修改请求中特定的属性
    req = req.clone({
      setHeaders: {
        Authorization: token
      },
      url: url,
      withCredentials: true
    });
    return next.handle(req);
  }
}