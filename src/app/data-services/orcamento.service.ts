import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsService } from '../core/services/endpoints/endpoints.service';
import { Observable } from 'rxjs';
import { Orcamento } from '../models/orcamento/orcamento';

@Injectable({ providedIn: 'root' })
export class OrcamentoService {
    constructor(
        private http: HttpClient,
        private endpointsService: EndpointsService
    ) { }

    public get(pesquisar: string = null): Observable<Orcamento[]> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/orcamento/?pesquisa=${pesquisar}`
        return this.http.get<Orcamento[]>(url);
    }

    public getById(id: string = null): Observable<Orcamento> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/orcamento/${id}`
        return this.http.get<Orcamento>(url);
    }

    public add(orcamento: Orcamento): Observable<Orcamento> {

        const url = `${this.endpointsService.getServerUrl()}api/v1/orcamento/`
        return this.http.post<Orcamento>(url, orcamento);
    }

    public update(orcamento: Orcamento): Observable<Orcamento> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/orcamento/${orcamento.id}`;
        return this.http.put<Orcamento>(url, orcamento);
    }

    public delete(id: string): Observable<any> {
        
        const url = `${this.endpointsService.getServerUrl()}api/v1/orcamento/${id}`;
        return this.http.delete<any>(url);
    }
}