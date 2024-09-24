import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add any custom logic here, e.g., adding headers
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer YOUR_TOKEN_HERE') // Example
    });
    return next.handle(clonedRequest);
  }
}
