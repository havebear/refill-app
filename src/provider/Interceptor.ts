import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('已经被拦截处理了');
    const baseUrl = '';
    const url: string = baseUrl + req.url;
    const token: string = '我是token';
    // 由于请求都是不可变的，所以不能直接修改他们
    // 要想修改，就是用clone()函数
    // 传给clone()函数的哈希对象可以让我们在复制的时候修改请求中特定的属性
    req = req.clone({
      setHeaders: {
        token: token
      },
      url: url,
      withCredentials: true
    });
    return next.handle(req);
  }
}