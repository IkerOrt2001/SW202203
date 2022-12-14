import {getConnection} from "@models/sqlite/SqliteConn";
import {CashFlowDao} from "@models/sqlite/CashFlowDao";
export interface ICashFlow{
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: string;
};

export class CashFlow{
    private dao: CashFlowDao;
    public constructor(){
        getConnection()
        .then(conn=>{
            this.dao = new CashFlowDao (conn);
        })
        .catch(ex=>console.error(ex));
    }
    private cashFlowItems: ICashFlow[] = [];
    //Consultas
    public getAllCashFlow(){
        return this.dao.getCashFlows()
        //return this.cashFlowItems; // Select * from cashfloe
    }

    public getCashFlowByIndex(index:number): ICashFlow {
            return this.cashFlowItems[index];
    }

    public addCashFlow(cashFlow:ICashFlow):number{
        const cashFlowExits = this.cashFlowItems.findIndex(
            (obj)=>{
                return obj.amount ===cashFlow.amount && obj.description === cashFlow.description;
            }
        );
        if (cashFlowExits<0){
            this.cashFlowItems.push(cashFlow);
            return this.cashFlowItems.length -1;
        }
        throw Error('CashFlow Exists on collection');   
    }

    public updateCashFlow(index: number, cashFlow:ICashFlow): boolean{
        if (index>=0 && index<this.cashFlowItems.length){
            this.cashFlowItems[index]=cashFlow;
            return true; 
        }
        return false;
    }

    public deleteCashFlow(index: number): boolean{
        if (index>=0 && index<this.cashFlowItems.length){
            this.cashFlowItems = this.cashFlowItems.filter(
                (_obj: ICashFlow, i:number)=>i!==index
            );
            return true; 
        }
        return false;
    }
}
