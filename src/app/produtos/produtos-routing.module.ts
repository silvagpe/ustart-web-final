import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadProdutoComponent } from './pages/cad-produto/cad-produto.component';
import { ProdutoComponent } from './pages/produto/produto.component';

const routes: Routes = [
  { path: '', component: ProdutoComponent },
  { path: 'cad-produto', component: CadProdutoComponent },
  { path: 'cad-produto/:id', component: CadProdutoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
