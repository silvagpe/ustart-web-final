import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from './app-routes';
import { AuthGuard } from './core/guards/auth-guard';
import { LoginGuard } from './core/guards/login-guard';
import { PublicGuard } from './core/guards/public-guard';
import { LoginComponent } from './login/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: AppRoutes.Login.base(),
    component: LoginComponent,
    canActivate: [LoginGuard]
  },   
  {
    path: AppRoutes.Clientes.base(),
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Grupos.base(),
    loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.FormaPagamento.base(),
    loadChildren: () => import('./forma-pagamento/forma-pagamento.module').then(m => m.FormaPagamentoModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Produto.base(),
    loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Orcamento.base(),
    loadChildren: () => import('./orcamentos/orcamentos.module').then(m => m.OrcamentosModule),
    canActivate: [AuthGuard]
  },
  {
    path: AppRoutes.Usuarios.base(),
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: "publico",
    loadChildren: () => import('./publico/publico.module').then(m => m.PublicoModule),    
    canActivate: [PublicGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
