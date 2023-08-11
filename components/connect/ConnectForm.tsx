import {TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
} from 'react-native-paper';
import {useContext, useState} from 'react';
import {NavigationContext, SetFormValueContext} from './Connect';
import {GlobalState} from '../../GlobalState';
import {ipAddressValidator} from '../../utils/validators/ip-address.validator';
import {portValidator} from '../../utils/validators/port.validator';
import {Microcontroller} from '../../microcontroller/microcontroller';
import {IConnectionParams} from '../../types/connection-params.interface';

interface IProps {
  ipAddress: string;
  port: string;
  showPopUpMessage: (message: string) => void;
}

const connectToMicrocontroller = (
  address: string,
  port: number,
): Promise<Microcontroller> =>
  new Promise<Microcontroller>((resolve, reject) => {
    const microcontroller = new Microcontroller(address, port);

    microcontroller.connection.addListener('connected', () => {
      resolve(microcontroller);
    });

    microcontroller.connection.addListener('timeout', () => {
      reject('timeout');
    });
  });

const ConnectForm = ({ipAddress, port, showPopUpMessage}: IProps) => {
  const {setMicrocontroller} = useContext(GlobalState);
  const {setIpAddress, setPort, setPreviousConnections} =
    useContext(SetFormValueContext);
  const navigation = useContext(NavigationContext);

  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);

    const address = ipAddress;
    const portNumber = parseInt(port, 10);

    try {
      const microcontroller = await connectToMicrocontroller(
        address,
        portNumber,
      );
      if (setMicrocontroller) {
        setMicrocontroller(microcontroller);
      }
      setIsConnecting(false);

      setPreviousConnections(prev => {
        const connection: IConnectionParams = {address, port: portNumber};
        return [
          connection,
          ...prev.filter(
            conn =>
              !(
                conn.port === connection.port &&
                conn.address === connection.address
              ),
          ),
        ];
      });
      navigation?.navigate('Dashboard');
    } catch (e) {
      showPopUpMessage(`cannot connect to ${address}:${port}`);
    }
  };

  return (
    <View>
      <View>
        <TextInput
          mode={'outlined'}
          label={'server address:'}
          value={ipAddress}
          onChangeText={setIpAddress}
          placeholder={'192.168.100.1'}
        />
        <HelperText type="error" visible={ipAddressValidator(ipAddress)}>
          Ip address is invalid!
        </HelperText>
      </View>

      <View>
        <TextInput
          mode={'outlined'}
          label={'server port:'}
          value={port}
          onChangeText={setPort}
          keyboardType="numeric"
          placeholder={'9000'}
        />
        <HelperText type="error" visible={portValidator(port)}>
          Port is invalid!
        </HelperText>
      </View>

      <TouchableOpacity>
        <Button
          onPress={() => connect()}
          disabled={
            portValidator(port) || ipAddressValidator(ipAddress) || isConnecting
          }
          style={{}}
          icon={isConnecting ? () => <ActivityIndicator /> : 'connection'}
          mode={'contained'}>
          {isConnecting ? 'Connecting...' : 'Connect'}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectForm;
