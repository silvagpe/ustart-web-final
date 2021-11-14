import { v4 as uuidv4 } from 'uuid';
import { Produto } from '../produtos/produto';

export class OrcamentoItem {
        
    public id: string
    public orcamentoId: string    
    public produtoId: string    
    public produto: Produto    
    public observacao: string
    public quantidade: number
    public precoUnitario: number
    public desconto: number
    public totalUnitario: number
    public totalItem: number
    
    constructor(init?: Partial<OrcamentoItem>) {
        debugger;
        if (init) {
            Object.assign(this, init);
        } else {
            this.id = uuidv4();
            this.quantidade = 1;
            this.desconto = 0;
        }
    }
}

 
 
 
 
 
 
 
 
 
 
 
 
 
 
