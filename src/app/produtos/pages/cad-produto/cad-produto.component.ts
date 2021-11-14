import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppRoutes } from 'src/app/app-routes';
import { GrupoService } from 'src/app/data-services/grupo.service';
import { ProdutoService } from 'src/app/data-services/produto.service';
import { AssignFormHelper } from 'src/app/helper/AssignFormHelper';
import { Grupo } from 'src/app/models/grupos/grupo';
import { Produto } from 'src/app/models/produtos/produto';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.scss']
})
export class CadProdutoComponent implements OnInit {

  private idSelecionado: string;
  public novoRegistro: boolean = false;
  public produto: Produto;

  public grupos: Grupo[] = [];
  public carregandoGrupos: boolean = false;
  public grupoSelecionado: string;


  public form: FormGroup = new FormGroup({
    grupoProdutoId: new FormControl(null, [Validators.required]),
    nome: new FormControl(null, [Validators.required]),
    descricao: new FormControl(null, [Validators.required]),
    preco: new FormControl(1, [Validators.min(1)]),
    urlImagem: new FormControl(null),
    codigoExterno: new FormControl(null),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private produtoService: ProdutoService,
    private grupoService: GrupoService
  ) {
    this.activatedRoute.params.subscribe(
      (params) => {

        //Carrega o id passado por parametro na URL
        this.idSelecionado = params.id;

        //Caso o parametro seja o valor "novo" então devemos gerar um novo registro
        if (this.idSelecionado == null || this.idSelecionado.toLowerCase() === 'novo') {
          this.novoRegistro = true;
          this.produto = new Produto();
          //Caso contrário devemos consultar na base para atualizar os valores
        } else {
          this.pesquisarPorId();
        }
      });
  }

  ngOnInit(): void {
    this.carregarGrupos();
  }

  private pesquisarPorId() {
    this.produtoService.getById(this.idSelecionado).subscribe(
      (result) => {
        this.produto = result;
        this.carregarDados();
      },
      (err) => { }
    );
  }

  private carregarGrupos() {
    this.grupoService.get("").subscribe(
      (grupos) => {
        this.carregandoGrupos = false;
        this.grupos = grupos;
      },
      (error) => {
        this.carregandoGrupos = false;
        this.modalService.error({
          nzTitle: 'Falha ao carregar os grupos',
          nzContent: 'Não foi possível carregar a lista de grupos.'
        });
        console.log(error);
      });
  }

  public cancelar(): void {
    this.router.navigateByUrl(AppRoutes.Produto.base());
  }

  public salvar(): void {

    //Passa os valores do form para o objeto
    AssignFormHelper.assignFormValues<Produto>(this.form, this.produto);

    //Se o form estiver válido segue para o processo de salvar ou atualizar
    if (this.form.valid) {

      //Verificar qual operaçao o usuário está querendo executar
      const operacao = this.novoRegistro ? this.produtoService.add(this.produto) : this.produtoService.update(this.produto);

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
    if (this.produto) {
      this.form.get("descricao").setValue(this.produto.descricao);
      this.form.get("grupoProdutoId").setValue(this.produto.grupoProdutoId);
      this.form.get("nome").setValue(this.produto.nome);
      this.form.get("descricao").setValue(this.produto.descricao);
      this.form.get("preco").setValue(this.produto.preco);
      this.form.get("urlImagem").setValue(this.produto.urlImagem);
      this.form.get("codigoExterno").setValue(this.produto.codigoExterno);

      this.grupoSelecionado = this.produto.grupoProdutoId;

    }

  }

}
