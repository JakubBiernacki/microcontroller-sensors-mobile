import {Microcontroller} from '../../server-connection/microcontroller/microcontroller'

export const connectToMicrocontroller = (
  address: string,
  port: number
): Promise<Microcontroller> =>
  new Promise<Microcontroller>((resolve, reject) => {
    const microcontroller = new Microcontroller(address, port)

    microcontroller.connection.addListener('connected', () => {
      resolve(microcontroller)
    })

    microcontroller.connection.addListener('timeout', () => {
      reject('timeout')
    })
  })
