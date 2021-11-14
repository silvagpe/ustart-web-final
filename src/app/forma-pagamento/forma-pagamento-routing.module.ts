import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadFormaPagamentoComponent } from './pages/cad-forma-pagamento/cad-forma-pagamento.component';
import { FormaPagamentoComponent } from './pages/forma-pagamento/forma-pagamento.component';

const routes: Routes = [
  { path: '', component: FormaPagamentoComponent },
  { path: 'cad-forma-pagamento', component: CadFormaPagamentoComponent },
  { path: 'cad-forma-pagamento/:id', component: CadFormaPagamentoComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormaPagamentoRoutingModule { }
