import { getConnection } from "@models/sqlite/SqliteConn";
import { UsuarioDao } from "@server/dao/models/sqlite/UsuarioDao";

export interface IUsuario {
  name: string;
  email: string;
  birthdate: Date;
};
export class Usuario {
  private dao: UsuarioDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new UsuarioDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  // Consultas
  public getAll() {
    return this.dao.getUsuarios()
  }
  public getById( index:number) {
      return this.dao.getUsuarioById({_id:index});
  }

  public create( user:IUsuario) {
    return this.dao.insertUsuario(user);
  }
  public update( index:number, user:IUsuario){
   return this.dao.update({_id:index}, user);
  }
  public delete( index:number) {
    return this.dao.delete({_id:index});
  }
}
