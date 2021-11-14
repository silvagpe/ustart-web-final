import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProdutoService } from 'src/app/data-services/produto.service';
import { AssignFormHelper } from 'src/app/helper/AssignFormHelper';
import { OrcamentoItem } from 'src/app/models/orcamento/orcamento-item';
import { Produto } from 'src/app/models/produtos/produto';

@Component({
  selector: 'app-modal-item-orcamento',
  templateUrl: './modal-item-orcamento.component.html',
  styleUrls: ['./modal-item-orcamento.component.scss']
})
export class ModalItemOrcamentoComponent implements OnInit {


  public orcamentoItem: OrcamentoItem

  public saldoEstoque:Number;

  public form: FormGroup = new FormGroup({
    produtoId: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null),
    quantidade: new FormControl(1, [Validators.required]),
    precoUnitario: new FormControl(1, [Validators.required]),
    desconto: new FormControl(0, [Validators.min(0)]),
    totalUnitario: new FormControl(0),
    totalItem: new FormControl(0),
  });

  public produtos: Produto[] = [];
  public carregandoProdutos: boolean = false;
  public produtoSel: string;

  constructor(
    private produtoService: ProdutoService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarDados();    
  }

  private carregarDados() {

    this.form.get("produtoId").setValue(this.orcamentoItem.produtoId);
    this.form.get("observacao").setValue(this.orcamentoItem.observacao);
    this.form.get("quantidade").setValue(this.orcamentoItem.quantidade);
    this.form.get("precoUnitario").setValue(this.orcamentoItem.precoUnitario);
    this.form.get("desconto").setValue(this.orcamentoItem.desconto);

    this.form.get("totalUnitario").setValue(this.orcamentoItem.totalUnitario);
    this.form.get("totalUnitario").disable();

    this.form.get("totalItem").setValue(this.orcamentoItem.totalItem);
    this.form.get("totalItem").disable();

    var produto = this.orcamentoItem.produto;
    if (produto) {
      this.produtoSel = produto.id;
    }

    this.calcularTotais();
  }

  private carregarProdutos() {
    this.produtoService.get("").subscribe(
      (result) => {
        this.carregandoProdutos = false;
        this.produtos = result;
      },
      (error) => {
        this.carregandoProdutos = false;
        this.modalService.error({
          nzTitle: 'Falha ao carregar os produtos',
          nzContent: 'Não foi possível carregar a lista de produtos.'
        });
        console.log(error);
      });
  }

  public produtoOnChange(event) {

    var produto = this.produtos.find((p) => p.id == event)
    if (produto) {
      this.form.get("precoUnitario").setValue(produto.preco);
      this.orcamentoItem.produto = produto;
      this.calcularTotais();
    }
  }

  public calcularTotais() {
    
    let preco = Number(this.form.get("precoUnitario").value)
    let quantidade = Number(this.form.get("quantidade").value)
    let desconto = Number(this.form.get("desconto").value)

    let totalUni = preco * quantidade;
    let totalDesconto = (preco * (desconto / 100)) * quantidade;
    let totalItem = totalUni - totalDesconto;

    this.form.get("totalUnitario").setValue(totalUni);
    this.form.get("totalItem").setValue(totalItem);

    this.orcamentoItem.totalUnitario = totalUni;
    this.orcamentoItem.totalItem = totalItem;
  }

  public formValido(): boolean{

    this.calcularTotais();    

    AssignFormHelper.assignFormValues<OrcamentoItem>(this.form, this.orcamentoItem);

    return this.form.valid;
  }

}
