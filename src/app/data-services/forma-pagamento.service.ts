import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../core/services/endpoints/endpoints.service';
import { Observable } from 'rxjs';
import { FormaPagamento } from '../models/forma-pagamento/forma-pagamento';

@Injectable({ providedIn: 'root' })
export class FormaPagamentoService {
    constructor(
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    public get(pesquisar: string = null): Observable<FormaPagamento[]> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/forma-pagamento/?pesquisa=${pesquisar}`
        return this.http.get<FormaPagamento[]>(url);
    }

    public getById(id: string = null): Observable<FormaPagamento> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/forma-pagamento/${id}`
        return this.http.get<FormaPagamento>(url);
    }

    public add(FormaPagamento: FormaPagamento): Observable<FormaPagamento> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/forma-pagamento/`
        return this.http.post<FormaPagamento>(url, FormaPagamento);
    }

    public update(FormaPagamento: FormaPagamento): Observable<FormaPagamento> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/forma-pagamento/${FormaPagamento.id}`;
        return this.http.put<FormaPagamento>(url, FormaPagamento);
    }

    public delete(id: string): Observable<any> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/forma-pagamento/${id}`;
        return this.http.delete<any>(url);
    }
}