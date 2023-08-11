import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'
import MicrocontrollerDevice from './microcontroller-device'
import {JsonConnection} from '../connection/json-connection'
import {IDevice} from '../interface/device.interface'

export class Microcontroller extends EventEmitter {
  private readonly _connection: JsonConnection
  private readonly _devices: MicrocontrollerDevice[]
  isReady: boolean = false

  constructor(public readonly address: string, public readonly port: number) {
    super()
    this._devices = []
    this._connection = new JsonConnection({address, port})

    this._connection.addListener('jsonData', this.handleData.bind(this))
  }

  get connection() {
    return this._connection
  }

  get devices() {
    return this._devices
  }

  handleData(jsonData: Record<string, any> | Record<string, any>[]) {
    console.log(jsonData)
    if (!Array.isArray(jsonData)) {
      return
    }

    const devicesData: IDevice[] = jsonData.filter(
      MicrocontrollerDevice.isValid
    )

    for (const deviceData of devicesData) {
      const device = this._devices.find(
        d => d.pin === deviceData.pin && d.type === deviceData.type
      )

      if (device) {
        device.update(deviceData)
      } else {
        console.log('new device added ', deviceData)
        const newDevice = new MicrocontrollerDevice(deviceData)
        this._devices.push(newDevice)
      }
    }

    if (!this.isReady) {
      this.isReady = true
      this.emit('ready')
    }

    this.emit('updated')
  }

  getDeviceByType(type: string) {
    for (const device of this._devices) {
      if (device.type === type) {
        return device
      }
    }
    return undefined
  }
}
