import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppRoutes } from 'src/app/app-routes';
import { FormaPagamentoService } from 'src/app/data-services/forma-pagamento.service';
import { AssignFormHelper } from 'src/app/helper/AssignFormHelper';
import { FormaPagamento } from 'src/app/models/forma-pagamento/forma-pagamento';

@Component({
  selector: 'app-cad-forma-pagamento',
  templateUrl: './cad-forma-pagamento.component.html',
  styleUrls: ['./cad-forma-pagamento.component.scss']
})
export class CadFormaPagamentoComponent implements OnInit {

  private idSelecionado: string;
  public novoRegistro: boolean = false;
  public formaPagamento: FormaPagamento;

  diasOpcoes: string[] = ['15', '30', '45', '60', '75', '90',];
  diasSelecionados = [];

  public form: FormGroup = new FormGroup({
    descricao: new FormControl(null, [Validators.required]),
    codigoExterno: new FormControl(null),
    desconto: new FormControl(0),
    dias: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private formaPagamentoService: FormaPagamentoService,
  ) {
    this.activatedRoute.params.subscribe(
      (params) => {

        //Carrega o id passado por parametro na URL
        this.idSelecionado = params.id;

        //Caso o parametro seja o valor "novo" então devemos gerar um novo registro
        if (this.idSelecionado == null || this.idSelecionado.toLowerCase() === 'novo') {
          this.novoRegistro = true;
          this.formaPagamento = new FormaPagamento();
          //Caso contrário devemos consultar na base para atualizar os valores
        } else {
          this.pesquisarPorId();
        }
      });
  }

  ngOnInit(): void {
  }

  private pesquisarPorId() {
    this.formaPagamentoService.getById(this.idSelecionado).subscribe(
      (result) => {
        this.formaPagamento = result;
        this.carregarDados();
      },
      (err) => { }
    );
  }

  public cancelar(): void {
    this.router.navigateByUrl(AppRoutes.FormaPagamento.base());
  }

  public salvar(): void {

    //Passa os valores do form para o objeto
    AssignFormHelper.assignFormValues<FormaPagamento>(this.form, this.formaPagamento);

    //Se o form estiver válido segue para o processo de salvar ou atualizar
    if (this.form.valid) {

      //Verificar qual operaçao o usuário está querendo executar
      const operacao = this.novoRegistro ? this.formaPagamentoService.add(this.formaPagamento) : this.formaPagamentoService.update(this.formaPagamento);

      operacao.subscribe((result) => {
        this.cancelar();
      },
        (err) => {
          let msg: string = '';
          if (err.error) {
            for (const iterator of err.error) {
              msg += `<p>${iterator.message}</p>`
            }

          }
          this.modalService.error({
            nzTitle: 'Falha ao registrar o registro',
            nzContent: `<p>Verifique os dados e tente novamente.</p>
                      ${msg}`
          });

        })
    }
  }

  private carregarDados() {
    if (this.formaPagamento) {
      this.form.get("descricao").setValue(this.formaPagamento.descricao);
      this.form.get("desconto").setValue(this.formaPagamento.desconto);
      this.form.get("codigoExterno").setValue(this.formaPagamento.codigoExterno);
      this.form.get("dias").setValue(this.formaPagamento.dias);
      this.diasSelecionados = this.formaPagamento.dias;
    }

  }

}
