import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { UsuarioService } from "../services/service.index";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: UsuarioService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = request.headers;
    if (
      !(
        request.url.toString().includes("token") ||
        request.url.toString().includes("forgot")
      )
    ) {
      headers = request.headers
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.auth.getCurrentToken()}`);
    }

    const cloneReq = request.clone({ headers });
    return next.handle(cloneReq);
  }
}
