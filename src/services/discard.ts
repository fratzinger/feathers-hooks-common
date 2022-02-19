import { Hook } from '@feathersjs/feathers';
import omit from 'lodash/omit';
import {checkContextIf} from './check-context-if';
import {getItems} from './get-items';
import {replaceItems} from './replace-items';

/**
 * Delete certain fields from the record(s).
 * {@link https://hooks-common.feathersjs.com/hooks.html#Discard}
 */
export function discard (...fieldNames: string[]): Hook {
  return (context: any) => {
    checkContextIf(context, 'before', ['create', 'update', 'patch'], 'discard');

    const items = getItems(context);
    const convert = (item: any) => omit(item, fieldNames);
    const converted = Array.isArray(items) ? items.map(convert) : convert(items);

    replaceItems(context, converted);

    return context;
  };
}