import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import {Connection} from './connection/connection';
import MicrocontrollerDevice from './microcontroller-device';

export class Microcontroller extends EventEmitter {
  private _connection: Connection;
  _devices: MicrocontrollerDevice[];
  isReady: boolean = false;

  constructor(public readonly address: string, public readonly port: number) {
    super();
    this._devices = [];
    this._connection = new Connection({address, port});

    this._connection.addListener('data', this.handleStringData.bind(this));
  }

  get connection() {
    return this._connection;
  }

  handleStringData(data: string) {
    const json = JSON.parse(data);

    if (!Array.isArray(json)) {
      return;
    }

    for (const jsonDevice of json) {
      if (
        !(
          jsonDevice.pin &&
          jsonDevice.type &&
          jsonDevice.online &&
          jsonDevice.data
        )
      ) {
        continue;
      }
      const {pin, type, online, data: jsonData} = jsonDevice;

      const device = this._devices.find(d => d.pin === pin && d.type === type);

      if (device) {
        device.online = online;
        device.data = jsonData;
      } else {
        const newDevice = new MicrocontrollerDevice(
          pin,
          type,
          online,
          jsonData,
        );
        this._devices.push(newDevice);
      }
    }

    if (!this.isReady) {
      this.isReady = true;
      this.emit('ready');
    }

    this.emit('updated');
  }

  getDeviceByType(type: string) {
    for (const device of this._devices) {
      if (device.type === type) {
        return device;
      }
    }
    return undefined;
  }

  get devices() {
    return this._devices;
  }
}
