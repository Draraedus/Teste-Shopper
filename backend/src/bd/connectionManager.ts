import mysqlConfig from "./dataBaseConfig";
import { QueryError  } from "mysql2";
import mysql from "mysql2"

export function openConnection(callback: (connection: mysql.Connection) => void): void {

  const connection = mysql.createConnection(mysqlConfig)
  
    connection.connect((err: QueryError | null) => {
    if (err) {

      console.error('Erro ao conectar ao banco de dados:', err)
      return
    }

    console.log('Conectado ao banco de dados MySQL!')
  
    callback(connection)
  })
}
  
export function closeConnection(connection: mysql.Connection): void {

  connection.end((err: QueryError | null) => {

    if (err) {

      console.error('Erro ao fechar a conexão:', err)
      return
    }

    console.log('Conexão MySQL fechada.')
  })
}