import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { NestResponse } from "./nest.response";

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost){
        this.httpAdapter = adapterHost.httpAdapter;
    }
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle()
            .pipe(
                map((respostaDoControlador: NestResponse) => {
                    if(respostaDoControlador instanceof NestResponse) {
                        const contexto = context.switchToHttp()
                        const resposta = contexto.getResponse()

                        const { headers, status, body } = respostaDoControlador

                        const nomeDosCabecalhos = Object.getOwnPropertyNames(headers)

                        nomeDosCabecalhos.forEach(nomeDosCabecalhos => {
                            const valorDocabecalho = headers[nomeDosCabecalhos]
                            this.httpAdapter.setHeader(resposta, nomeDosCabecalhos, valorDocabecalho)
                        })

                        this.httpAdapter.status(resposta, status)
                        return body
                    }

                    return respostaDoControlador
                })
            )
    }
}