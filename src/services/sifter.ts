import { BadRequest } from '@feathersjs/errors';
import { Hook } from '@feathersjs/feathers';
import { SyncContextFunction } from '../types';
import {checkContext} from './check-context';
import {getItems} from './get-items';
import {replaceItems} from './replace-items';

export function sifter (
  siftFunc: SyncContextFunction<(item: any) => boolean>
): Hook {
  return (context: any) => {
    checkContext(context, 'after', 'find', 'sifter');

    if (typeof siftFunc !== 'function') {
      throw new BadRequest('The sifter param must be a function. (sifter)');
    }

    const sifter = siftFunc(context);

    if (typeof sifter !== 'function') {
      throw new BadRequest('The result of calling the sifter param must be a function. (sifter)');
    }

    replaceItems(context, getItems(context).filter(sifter));

    return context;
  };
}
