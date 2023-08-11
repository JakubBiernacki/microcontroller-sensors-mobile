import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

export default class MicrocontrollerDevice extends EventEmitter {
  constructor(
    public pin: number,
    public type: string,
    public online: boolean,
    public data: Record<string, any>,
  ) {
    super();
  }

  update(device: MicrocontrollerDevice) {
    let updated = false;

    if (this.online !== device.online) {
      updated = true;
    }

    for (const key of Object.keys(device.data)) {
      if (device.data[key] !== this.data[key]) {
        updated = true;

        this.data = {...this.data, ...device.data};
        break;
      }
    }

    if (updated) {
      this.emit('updated');
    }

    return updated;
  }
}
