/* eslint-disable prettier/prettier */
import { UserInfo } from './user.entity';

/**
 * Se exporta el modelo para que sea accesible.
 */
export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue:UserInfo,
  },
];
