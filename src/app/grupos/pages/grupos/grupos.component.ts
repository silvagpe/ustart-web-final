import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { Grupo } from 'src/app/models/grupos/grupo';
import { debounce } from 'lodash';
import { GrupoService } from 'src/app/data-services/grupo.service';
import { LoadingService } from 'src/app/core/components/loading/loading.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  public loading: boolean = false;
  public grupos: Grupo[] = [];

  constructor(
    private router: Router,
    private grupoService: GrupoService,
    private loadingService: LoadingService,
    private modalService: NzModalService
  ) {

    this.localizar = debounce(this.localizar, 400);
  }


  ngOnInit(): void {
    //Pesquisa inicial quando entra na tela
    this.pesquisar("");
  }

  public novoGrupo(): void {
    const url = `${AppRoutes.Grupos.Cadastro()}/novo`;
    this.router.navigateByUrl(url);
  }

  public localizar(event: any): void {
    const value = event.target.value;
    if (value && value.trim() !== '') {
      console.log("Localizar", value)
      this.pesquisar(value);
    } else {
      this.limparPesquisa();
    }
  }

  private pesquisar(pesquisa: string): void {
    this.loading = true;
    this.grupoService.get(pesquisa).subscribe(
      (result) => {
        this.grupos = result;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );

  }

  public limparPesquisa(): void {
    console.log("limpar");
    this.pesquisar("");
  }

  public editar(grupo: Grupo): void {
    var url = `${AppRoutes.Grupos.Cadastro()}/${grupo.id}`;
    this.router.navigateByUrl(url);
  }

  public excluir(grupo: Grupo): void {
    if (confirm(`Deseja excluir o registro ${grupo.descricao}?`)) {
      this.grupoService.delete(grupo.id).subscribe(
        (result) => {
          this.pesquisar("");
        },
        (err) => {
          let msg: string = '';
          if (err.error) {
            for (const iterator of err.error) {
              msg += `<p>${iterator.message}</p>`
            }

          }
          this.modalService.error({
            nzTitle: 'Falha ao excluir o registro',
            nzContent: `<p>Verifique os dados e tente novamente.</p>
                        ${msg}`
          });

        }
      );
    }
  }

}
