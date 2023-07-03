import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import {MicrocontrollerConnection} from './connection/microcontroller-connection';

class Microcontroller extends EventEmitter {
  connection?: MicrocontrollerConnection;
  devices?: string[];

  constructor(public readonly address: string, public readonly port: number) {
    super();
  }

  get connected() {
    return this.connection?.isReady;
  }
}
