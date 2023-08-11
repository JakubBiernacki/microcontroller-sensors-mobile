import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter'
import TcpSocket from 'react-native-tcp-socket'
import {IConnectionParams} from '../../common/types/connection-params.interface'

const TIMEOUT = 5000

export class Connection extends EventEmitter {
  private _socket?: TcpSocket.Socket
  public isConnected: boolean

  constructor(public readonly connectionParams: IConnectionParams) {
    super()
    this.isConnected = false

    this._connect()
    this.addListener('connected', () => {
      this.isConnected = true
    })

    this.addListener('disconnected', () => {
      this.isConnected = false
    })
  }

  _connect() {
    const socket = new TcpSocket.Socket()

    const timeout = setTimeout(() => {
      socket.destroy()
      this.emit('timeout')
    }, TIMEOUT)

    socket.connect(
      {
        host: this.connectionParams.address,
        port: this.connectionParams.port
      },
      () => {
        clearTimeout(timeout)
        this._socket = socket
        this.emit('connected')
      }
    )

    socket.on('data', data => {
      const stringMessage: string = data.toString()
      this.emit('data', stringMessage)
    })

    socket.on('error', error => {
      console.log(error)
      this.emit('error', error)
    })

    socket.on('close', () => {
      console.log('Connect closed!')
      this.emit('disconnected')
    })
  }

  destroy() {
    this._socket?.destroy()
    this._socket = undefined
  }
}
