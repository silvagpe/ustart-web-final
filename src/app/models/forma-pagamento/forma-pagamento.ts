import { v4 as uuidv4 } from 'uuid';

export class FormaPagamento {
    public id: string;
    public descricao: string;
    public codigoExterno: string;
    public desconto: number;
    public dias: string[];

    constructor(init?: Partial<FormaPagamento>) {
        debugger;
        if (init) {
            Object.assign(this, init);
        } else {
            this.id = uuidv4();
        }
    }
}