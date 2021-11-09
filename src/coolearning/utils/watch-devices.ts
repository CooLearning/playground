import { state } from '../state';

/**
 * @description devices parser for midi events
 */
export function watchDevices (event: any): void {
  const {port} = event;

  if (!port) return;

  const {connection, id, type} = port;

  if (!connection) return;
  if (type !== 'input') return;

  connection === 'open'
    ? state.addDevice ({id})
    : state.removeDevice ({id});

}
