import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadOrcamentoComponent } from './pages/cad-orcamento/cad-orcamento.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';

const routes: Routes = [
  { path: '', component: OrcamentoComponent },
  { path: 'cad-orcamento', component: CadOrcamentoComponent },
  { path: 'cad-orcamento/:id', component: CadOrcamentoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrcamentosRoutingModule { }
