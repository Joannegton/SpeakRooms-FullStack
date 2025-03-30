import { Excecao } from './exception'
import { HttpResponseError, HttpResponseOK } from './httpResponse'
import { Resultado } from './result'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpCodeMap {
    [key: string]: number
}

export interface HttpResponseConfig {
    httpCodeMap: HttpCodeMap
    defaultHttpCodeErrors?: number
}

export interface BuildResponseProps {
    result: Resultado<Excecao, any>
    headers?: object
    successStatusCode?: number
}

export abstract class AbstractController {
    private httpResponseConfig: HttpResponseConfig

    constructor(httpResponseConfig: HttpResponseConfig) {
        this.httpResponseConfig = {
            httpCodeMap: httpResponseConfig?.httpCodeMap || {},
            defaultHttpCodeErrors:
                httpResponseConfig?.defaultHttpCodeErrors || 500,
        }
    }

    public buildResponse(
        props: BuildResponseProps,
    ): HttpResponseOK | HttpResponseError {
        try {
            let result: HttpResponseOK | HttpResponseError

            if (props.result.ehSucesso()) {
                const data = props.result.valor
                const headers = props?.headers

                // if(props.result.valor instanceof PaginatedResult){
                //     data = props.result.valor.data
                //     headers = {
                //         ...headers,
                //         'pagination-size': props.result.valor.totalCount,
                //         'pagination-total': props.result.valor.page,
                //     }
                // }

                result = new HttpResponseOK(data, {
                    headers: headers,
                    statusCode: props.successStatusCode,
                })
            } else {
                result = new HttpResponseError(
                    props.result.erro.constructor.name,
                    props.result.erro.message,
                    {
                        headers: props?.headers,
                        statusCode:
                            this.httpResponseConfig.httpCodeMap[
                                props.result.erro.getNome()
                            ] || this.httpResponseConfig.defaultHttpCodeErrors,
                    },
                )
            }
            return result
        } catch (error) {
            return new HttpResponseError(
                error.constructor.name,
                error.message,
                {
                    headers: props?.headers,
                    statusCode:
                        this.httpResponseConfig.httpCodeMap[
                            error.constructor.name
                        ] || this.httpResponseConfig.defaultHttpCodeErrors,
                },
            )
        }
    }
}
