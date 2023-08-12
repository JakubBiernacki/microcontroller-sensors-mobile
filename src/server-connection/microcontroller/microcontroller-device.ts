import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'
import {IDevice} from '../interface/device.interface'

export default class MicrocontrollerDevice
  extends EventEmitter
  implements IDevice
{
  pin: number
  type: string
  online: boolean
  data: Record<string, any>

  constructor(public deviceData: IDevice) {
    super()

    this.pin = deviceData.pin
    this.type = deviceData.type
    this.online = deviceData.online
    this.data = deviceData.data
  }

  update(device: IDevice) {
    let updated = false

    if (this.online !== device.online) {
      updated = true
    }

    for (const key of Object.keys(device.data)) {
      if (device.data[key] !== this.data[key]) {
        updated = true

        this.data = {...this.data, ...device.data}
        break
      }
    }

    if (updated) {
      this.emit('updated')
    }

    return updated
  }

  static isValid(device: Record<any, any>): boolean {
    return (
      device.pin && device.type && device.online !== undefined && device.data
    )
  }
}
