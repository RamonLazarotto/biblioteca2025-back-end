import { DataTypes } from "sequelize";
import banco from "../banco.js";

//Mapeamento do modelo Editora
export default banco.define(
    'editora', //Tabela Editora
    {
      // atributos do modelo são definidos aqui (Campos da tabela)
      ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomeeditora: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      endereco: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }
  )