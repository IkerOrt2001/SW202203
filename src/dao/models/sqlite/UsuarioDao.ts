import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';
import { IUsuario } from "../entities/Usuario";

export class UsuarioDao extends AbstractDao<IUsuario> {
  public constructor(db:sqlite.Database){
    super('Usuarios', db as sqlite.Database );
    super.exec('CREATE TABLE IF NOT EXISTS Usuarios ('
     + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
     + ' name TEXT,'
     + ' email TEXT,'
     + ' birthdate TEXT);'
     ).then().catch(e=>console.error(e));
  }
  public async getUsuarios() {
    return super.findAll()
  }
  public async getUsuarioById( identifier : Partial<IUsuario> ){
    try{
      const result = await super.findById(identifier);
      return result;
    } catch( ex: unknown) {
      console.log("Usuario sqlite:", (ex as Error).message);
      throw ex;
    }
  }

  public async insertUsuario( newUsuario: IUsuario) {
    try {
      const result = await super.createOne(newUsuario);
      return result;
    } catch( ex: unknown) {
      console.log("Usuario sqlite:", (ex as Error).message);
      throw ex;
    }
  }

  public async updateUsuario( updateUsuario: IUsuario) {
    try {
      const {_id, ...updateObject} = updateUsuario;
      const result = await super.update({_id}, updateObject);
      return result;
    } catch( ex: unknown) {
      console.log("Usuario sqlite:", (ex as Error).message);
      throw ex;
    }
  }

  public async deleteUsuario( deleteUsuario: Partial<IUsuario>) {
    try {
      const {_id } = deleteUsuario;
      const result = await super.delete({_id});
      return result;
    } catch( ex: unknown) {
      console.log("Usuario sqlite:", (ex as Error).message);
      throw ex;
    }
  }
}