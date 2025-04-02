import express from "express";
import { Sequelize, DataTypes } from "sequelize"; //Usa as chaves pois dentro da biblioteca dentro dela existem vários métodos
                                                  //Dentro das chaves fica somente o método que vai usar


//Configuração com o Banco
const sequelize = new Sequelize('biblioteca2025', 'postgres', '1234', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

//Mapeamento do modelo Editora
const Editora = sequelize.define(
    'editora',
    {
      // atributos do modelo são definidos aqui
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
  );

try {
    await sequelize.authenticate();
    console.log('Conexão com o Banco de Dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar-se com o banco de dados:', error);
  }

const app = express();
app.use(express.json());

app.get('/teste', (req, res) => {
    res.send("Teste ok")
})

app.listen(3000, () => {console.log("Servidor Rodando.") });