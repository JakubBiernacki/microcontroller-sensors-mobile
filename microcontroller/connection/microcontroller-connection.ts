import {ServerConnection} from './server-connection';
import {IConnectionOption} from '../../types/connection-option.interface';

export class MicrocontrollerConnection extends ServerConnection {
  constructor(connectionOption: IConnectionOption) {
    super(connectionOption);

    this.addListener('data', this.handleMessage.bind(this));
  }

  handleMessage(data: string) {
    const json = JSON.parse(data);
    console.log('json message');
    console.log(json);

    this.emit('jsonData', json);
  }
}
