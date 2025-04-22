import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
    'funcionario',
    {
        idfuncionario:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nomefuncionario:{
            type: DataTypes.STRING(60),
            allowNull: false
        },
        cpf:{
            type: DataTypes.STRING(15),
            allowNull: true
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telefone:{
            type: DataTypes.STRING(15),
            allowNull: true
        },
        nascimento:{
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        salario:{
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        contratacao:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        demissao:{
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        ativo:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        senha:{
            type: DataTypes.STRING(100),
            allowNull: true
        },
        token:{
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }
)