import { Sequelize, DataTypes, where } from "sequelize"; //Usa as chaves pois dentro da biblioteca dentro dela existem vários métodos
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

export default sequelize;