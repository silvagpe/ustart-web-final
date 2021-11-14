import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppRoutes } from 'src/app/app-routes';
import { LoadingService } from 'src/app/core/components/loading/loading.service';
import { FormaPagamentoService } from 'src/app/data-services/forma-pagamento.service';
import { FormaPagamento } from 'src/app/models/forma-pagamento/forma-pagamento';
import { debounce } from 'lodash';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.scss']
})
export class FormaPagamentoComponent implements OnInit {

  public loading: boolean = false;
  public formasPagamento: FormaPagamento[] = [];

  constructor(
    private router: Router,
    private formaPagamentoService: FormaPagamentoService,
    private modalService: NzModalService
  ) {

    this.localizar = debounce(this.localizar, 400);
  }


  ngOnInit(): void {
    //Pesquisa inicial quando entra na tela
    this.pesquisar("");
  }

  public novo(): void {
    const url = `${AppRoutes.FormaPagamento.Cadastro()}/novo`;
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
    this.formaPagamentoService.get(pesquisa).subscribe(
      (result) => {
        this.formasPagamento = result;
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

  public editar(formaPagamento: FormaPagamento): void {
    var url = `${AppRoutes.FormaPagamento.Cadastro()}/${formaPagamento.id}`;
    this.router.navigateByUrl(url);
  }

  public excluir(formaPagamento: FormaPagamento): void {
    if (confirm(`Deseja excluir o registro ${formaPagamento.descricao}?`)) {
      this.formaPagamentoService.delete(formaPagamento.id).subscribe(
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

  public formatarDias(formaPagamento:FormaPagamento){
    return (formaPagamento) ?  formaPagamento.dias.join(", ") : "";
  }
}
