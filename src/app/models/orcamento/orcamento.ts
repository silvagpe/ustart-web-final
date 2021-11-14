import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../clientes/cliente';
import { FormaPagamento } from '../forma-pagamento/forma-pagamento';
import { OrcamentoItem } from './orcamento-item';

export class Orcamento {
    public id: string
    public dataOrcamento: Date
    public clienteId: string 
    public cliente:Cliente   
    public usuarioId: string    
    public formaPagamentoId: string    
    public formaPagamento: FormaPagamento
    public observacao: string
    public itens: OrcamentoItem[]
    public quantidadeDeItens: number
    public totalItens: number
    public totalDesconto: number
    public totalProdutos: number
    
    constructor(init?: Partial<Orcamento>) {
        debugger;
        if (init) {
            Object.assign(this, init);
        } else {
            this.id = uuidv4();            
            this.itens = [];            
        }
    }
}

 
 
 
 
 
 
 
 
 
 
 
 
 
 
