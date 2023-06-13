/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { UserInfo } from './user/user.entity';
import { UserGroup } from './radusergroup/usergroup.entity';
import { RadCheck } from './rasdusercheck/radcheck.entity';


// const HOST = process.env.DB_HOST
// const USERNAME = process.env.DB_USERNAME
// const PASSWORD = process.env.DB_PASSWORD 
// const DB = process.env.DB_NAME


/**
 * Conexion a la BD.
 * @todo Reemplazar los valores usando por variables de entorno.
 */
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mariadb',
        // host: '10.2.73.20',
        host: "host.docker.internal",
        port: 3306,
        // username: 'fran',
        username: "radius",
        password: "zh49cUPs8sQMvPgX",
        // database: 'radius ',
        database:'nest',

      });
      sequelize.addModels([UserInfo, UserGroup, RadCheck]);
      await sequelize.sync();
      return sequelize;
    },
  },
];