import {Connection} from './connection'
import {IConnectionParams} from '../../common/types/connection-params.interface'

export class JsonConnection extends Connection {
  constructor(connectionParams: IConnectionParams) {
    super(connectionParams)

    this.addListener('data', this.handleMessage.bind(this))
  }

  handleMessage(data: string) {
    try {
      const json = JSON.parse(data)

      this.emit('jsonData', json)
    } catch (e) {}
  }
}
