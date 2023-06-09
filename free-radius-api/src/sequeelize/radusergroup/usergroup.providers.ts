/* eslint-disable prettier/prettier */
import { UserGroup } from './usergroup.entity';

/**
 * Se exporta el modelo para que sea accesible.
 */
export const userGroupProviders = [
  {
    provide: 'USERGROUP_REPOSITORY',
    useValue:UserGroup,
  },
];
