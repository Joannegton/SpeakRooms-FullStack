/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import {
    HttpResponse,
    HttpResponseError,
    HttpResponseOK,
} from 'http-service-result'

@Injectable()
export class HttpInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest()

        if (isNaN(parseInt(request.headers['pagination-page']))) {
            request.headers['pagination-page'] = 1
        }

        if (isNaN(parseInt(request.headers['pagination-limit']))) {
            request.headers['pagination-limit'] = 10
        }

        context
            .switchToHttp()
            .getResponse()
            .header('pagination-page', request.headers['pagination-page'])

        context
            .switchToHttp()
            .getResponse()
            .header('pagination-limit', request.headers['pagination-limit'])

        return next.handle().pipe(
            map((body: HttpResponseOK | HttpResponseError) => {
                if (body instanceof HttpResponse) {
                    context.switchToHttp().getResponse().statusCode =
                        body.statusCode

                    if (body.headers && typeof body.headers === 'object') {
                        const headersName = Object.getOwnPropertyNames(
                            body.headers,
                        )

                        headersName.forEach((name) => {
                            context
                                .switchToHttp()
                                .getResponse()
                                .header(name, body.headers[name])
                        })
                    }
                }
                if (body instanceof HttpResponseOK) {
                    return {
                        data: body.data,
                    }
                } else if (body instanceof HttpResponseError) {
                    return {
                        error: body.error,
                        message: body.message,
                    }
                }
                return body
            }),
        )
    }
}
