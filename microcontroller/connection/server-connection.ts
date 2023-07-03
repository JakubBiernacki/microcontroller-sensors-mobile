import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import TcpSocket from 'react-native-tcp-socket';
import {IConnectionOption} from '../../types/connection-option.interface';

const TIMEOUT = 5000;

export class ServerConnection extends EventEmitter {
  _socket?: TcpSocket.Socket;

  isReady: boolean;
  public readonly address: string;
  public readonly port: number;
  constructor(connectionOption: IConnectionOption) {
    super();
    this.isReady = false;
    this.address = connectionOption.address;
    this.port = connectionOption.port;

    this._connect();

    this.addListener('connected', () => {
      this.isReady = true;
    });

    this.addListener('disconnected', () => {
      this.isReady = false;
    });
  }

  _connect() {
    const socket = new TcpSocket.Socket();

    const timeout = setTimeout(() => {
      socket.destroy();
      this.emit('timeout');
    }, TIMEOUT);

    socket.connect(
      {
        host: this.address,
        port: this.port,
      },
      () => {
        clearTimeout(timeout);
        this._socket = socket;
        this.emit('connected');
      },
    );

    socket.on('data', data => {
      const stringMessage: string = data.toString();
      this.emit('data', stringMessage);
    });

    socket.on('error', error => {
      console.log(error);
      this.emit('error', error);
    });

    socket.on('close', () => {
      console.log('Connection closed!');
      this.emit('disconnected');
    });
  }
}
