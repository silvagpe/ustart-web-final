import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormaPagamentoRoutingModule } from './forma-pagamento-routing.module';
import { FormaPagamentoComponent } from './pages/forma-pagamento/forma-pagamento.component';
import { CadFormaPagamentoComponent } from './pages/cad-forma-pagamento/cad-forma-pagamento.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    FormaPagamentoComponent,
    CadFormaPagamentoComponent
  ],
  imports: [
    CommonModule,
    FormaPagamentoRoutingModule,
    NzPageHeaderModule,
    NzLayoutModule,    
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,       
    NzTableModule,
    NzPaginationModule,
    NzIconModule,
    NzSpinModule,
    NzSelectModule
  ]
})
export class FormaPagamentoModule { }
