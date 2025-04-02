export interface HttpResponseProps {
    headers?: object
    statusCode?: number
}

export class HttpResponse {
    headers: object
    statusCode: number

    constructor(props?: HttpResponseProps) {
        this.headers = props?.headers
        this.statusCode = props?.statusCode
    }
}

export class HttpResponseOK extends HttpResponse {
    constructor(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public data: any,
        httpResponse?: HttpResponseProps,
    ) {
        super({ ...httpResponse, statusCode: httpResponse?.statusCode || 200 })
    }
}

export class HttpResponseError extends HttpResponse {
    constructor(
        public error: string,
        public message: string,
        httpResponse?: HttpResponseProps,
    ) {
        super({ ...httpResponse, statusCode: httpResponse?.statusCode || 500 })
    }
}
