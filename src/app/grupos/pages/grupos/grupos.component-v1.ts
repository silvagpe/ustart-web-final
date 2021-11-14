import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { Grupo } from 'src/app/models/grupos/grupo';
import { debounce } from 'lodash';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupos.component-v1-so-html.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent_v1 implements OnInit {

  public loading:boolean = false;
  public grupos:Grupo[] = [];

  constructor(private router: Router) { 

    this.localizar = debounce(this.localizar, 400);
  }


  ngOnInit(): void {

    this.grupos.push(new Grupo({id:"1", descricao:"teste", codigoExterno:"cod 1"}))
    this.grupos.push(new Grupo({id:"2", descricao:"teste 2", codigoExterno:"cod 2"}))
  }

  public novoGrupo(): void {
    const url = `${AppRoutes.Grupos.Cadastro()}/novo`;
    this.router.navigateByUrl(url);
  }

  public localizar(event: any): void {
    const value = event.target.value;
    if (value && value.trim() !== '') {
      console.log("Localizar", value)
    } else {
      this.limparPesquisa();
    }
  }

  public limparPesquisa(): void {
    console.log("limpar");
  }

  public editar(grupo: Grupo):void{
    var url = `${AppRoutes.Grupos.Cadastro()}/${grupo.id}`;    
    this.router.navigateByUrl(url);    
  }

  public excluir(grupo: Grupo):void{
    if(confirm(`Deseja excluir o registro ${grupo.descricao}?`)){
      console.log("excluindo...")
    }
  }

}
