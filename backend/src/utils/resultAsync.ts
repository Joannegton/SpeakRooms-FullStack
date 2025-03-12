/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exception } from './exception'

export type Result<L, A> = Failure<L, A> | Ok<L, A>
export type ResultAsync<L, A> = Promise<Result<L, A>>
interface IResult<L, A> {
    isOk(): this is Ok<L, A>
    isFailure(): this is Failure<L, A>
}
export declare class Failure<L, A> implements IResult<L, A> {
    readonly error: L
    constructor(error: L)
    isFailure(): this is Failure<L, A>
    isOk(): this is Ok<L, A>
    applyOnRight<B>(_: (a: A) => B): Result<L, B>
}
export declare class Ok<L, A> implements IResult<L, A> {
    readonly value: A
    constructor(value?: A)
    isFailure(): this is Failure<L, A>
    isOk(): this is Ok<L, A>
    applyOnRight<B>(func: (a: A) => B): Result<L, B>
}
export declare abstract class R {
    static ok<A = void, L = any>(value?: A): Result<L, A>
    static failure<L extends Exception, A>(value: L): Result<L, A>
    static isOk<L, A>(eitherList: Array<IResult<L, A>>): boolean
    static hasFailure<L, A = any>(
        either: IResult<L, A> | IResult<L, A>[],
    ): boolean
    static listFailure<L, A = any>(either: IResult<L, A>[]): Failure<L[], A>
    static getFailure<L, A = any>(either: IResult<L, A>[]): Failure<L, A>
    static getValue<L, A = any>(either: IResult<L, A>): A
    static getResult<L, A>(
        eitherList: IResult<L, unknown>[],
        rightValue: A,
    ): Result<L, A>
}
export {}
