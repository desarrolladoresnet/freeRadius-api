/* eslint-disable prettier/prettier */
import { RadCheck } from './radcheck.entity';

/**
 * Se exporta el modelo para que sea accesible.
 */
export const radcheckProvider = [
  {
    provide: 'RADCHECK_REPOSITORY',
    useValue: RadCheck,
  },
];
