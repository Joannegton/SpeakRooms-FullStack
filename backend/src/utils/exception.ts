/* eslint-disable @typescript-eslint/no-explicit-any */

export declare abstract class Exception extends Error {
    detail: string
    constructor(creationProps?: Error | string)
    abstract getName(): string
    abstract getInstance(): this
    setMessage(message: string): this
    setStack(stack: string): this
    setDetail(detail: string): this
    toString(): string
}
export declare class RepositoryException extends Exception {
    RepositoryException: string
    getMessage(): string
    getName(): string
    getInstance(): this
}
export declare class ServiceException extends Exception {
    ServiceException: string
    getMessage(): string
    getName(): string
    getInstance(): this
}
export declare class QQFrameworkException extends Exception {
    QQFrameworkException: string
    getMessage(): string
    getName(): string
    getInstance(): this
}
export declare class InvalidPropsException extends Exception {
    InvalidPropsException: string
    getInstance(): this
    getMessage(): string
    getName(): string
}
export declare class HttpException extends Exception {
    HttpException: string
    status: number
    data: any
    getInstance(): this
    getMessage(): string
    getName(): string
    setData(data: any): HttpException
    setStatus(status: number): HttpException
}
export declare class ProcessRunningException extends Exception {
    ProcessRunningException: string
    getInstance(): this
    getMessage(): string
    getName(): string
}
export declare class RepositoryNoDataFoundException extends Exception {
    RepositoryNoDataFoundException: string
    getInstance(): this
    getMessage(): string
    getName(): string
}
