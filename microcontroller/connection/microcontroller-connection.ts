import {Connection} from './connection';
import {IConnectionParams} from '../../types/connection-params.interface';

export class MicrocontrollerConnection extends Connection {
  constructor(connectionParams: IConnectionParams) {
    super(connectionParams);

    this.addListener('data', this.handleMessage.bind(this));
  }

  handleMessage(data: string) {
    const json = JSON.parse(data);

    this.emit('jsonData', json);
  }
}
