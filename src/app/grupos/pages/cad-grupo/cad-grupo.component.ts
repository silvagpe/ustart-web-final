import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { GrupoService } from 'src/app/data-services/grupo.service';
import { AssignFormHelper } from 'src/app/helper/AssignFormHelper';
import { Grupo } from 'src/app/models/grupos/grupo';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-cad-grupo',
  templateUrl: './cad-grupo.component.html',
  styleUrls: ['./cad-grupo.component.scss']
})
export class CadGrupoComponent implements OnInit {

  private idSelecionado: string;
  public novoRegistro: boolean = false;
  public grupo: Grupo;

  public form: FormGroup = new FormGroup({
    descricao: new FormControl(null, [Validators.required]),
    codigoExterno: new FormControl(null),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private grupoService: GrupoService,
    private modalService: NzModalService,) {
    this.activatedRoute.params.subscribe(
      (params) => {

        //Carrega o id passado por parametro na URL
        this.idSelecionado = params.id;

        //Caso o parametro seja o valor "novo" então devemos gerar um novo registro
        if (this.idSelecionado == null || this.idSelecionado.toLowerCase() === 'novo') {
          this.novoRegistro = true;
          this.grupo = new Grupo();
          //Caso contrário devemos consultar na base para atualizar os valores
        } else {
          this.pesquisarPorId();
        }
      });
  }

  ngOnInit(): void {
  }

  private pesquisarPorId() {
    this.grupoService.getById(this.idSelecionado).subscribe(
      (result) => {
        this.grupo = result;
        this.carregarDados();
      },
      (err) => { }
    );
  }

  public cancelar(): void {
    this.router.navigateByUrl(AppRoutes.Grupos.base());
  }

  public salvar(): void {

    //Passa os valores do form para o objeto grupo
    AssignFormHelper.assignFormValues<Grupo>(this.form, this.grupo);

    //Se o form estiver válido segue para o processo de salvar ou atualizar
    if (this.form.valid) {

      //Verificar qual operaçao o usuário está querendo executar
      const operacao = this.novoRegistro ? this.grupoService.add(this.grupo) : this.grupoService.update(this.grupo);

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
    if (this.grupo) {
      this.form.get("descricao").setValue(this.grupo.descricao);
      this.form.get("codigoExterno").setValue(this.grupo.codigoExterno);
    }

  }

}
