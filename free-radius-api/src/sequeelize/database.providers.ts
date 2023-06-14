/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { UserInfo } from './user/user.entity';
import { UserGroup } from './radusergroup/usergroup.entity';
import { RadCheck } from './rasdusercheck/radcheck.entity';




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
       /* host: '10.2.73.20', */
        host: "localhost",
        port: 3306,
        // username: 'root',
        username: "radius",
        // password: "7448280",
        password: "zh49cUPs8sQMvPgX",
        database: 'radius',
        // database:'nest',
        dialectOptions: {
          allowPublicKeyRetrieval: true,
        },

      });
      sequelize.addModels([UserInfo, UserGroup, RadCheck]);
      await sequelize.sync();
      return sequelize;
    },
  },
];