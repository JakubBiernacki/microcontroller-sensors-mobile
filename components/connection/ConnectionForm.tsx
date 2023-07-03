import {TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
} from 'react-native-paper';
import {useContext, useState} from 'react';
import {NavigationContext, SetFormValueContext} from './context';
import {MicrocontrollerConnection} from '../../microcontroller/connection/microcontroller-connection';
import {GlobalState} from '../../GlobalState';

interface IProps {
  ipAddress: string;
  port: string;
  showPopUpMessage: (message: string) => void;
}

const ipAddressHasError = (ipAddress: string) => {
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  const isValid = regexExp.test(ipAddress);
  return !isValid;
};

const portHasError = (port: string) => {
  const regexExp =
    /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/gi;

  const isValid = regexExp.test(port);
  return !isValid;
};

const ConnectionForm = ({ipAddress, port, showPopUpMessage}: IProps) => {
  const {setMicrocontrollerConnection} = useContext(GlobalState);
  const {setIpAddress, setPort, setPreviousConnections} =
    useContext(SetFormValueContext);
  const navigation = useContext(NavigationContext);

  const [isConnecting, setIsConnecting] = useState(false);

  const connectToServer = () => {
    setIsConnecting(true);

    const connectionOptions = {
      address: ipAddress,
      port: parseInt(port, 10),
    };

    const connect = new MicrocontrollerConnection(connectionOptions);

    connect.addListener('connected', () => {
      setPreviousConnections(value => [connectionOptions, ...value]);
      if (setMicrocontrollerConnection) {
        setMicrocontrollerConnection(connect);
        setIsConnecting(false);
        navigation?.navigate('Monitor');
      }
    });

    connect.addListener('timeout', () => {
      setIsConnecting(false);
      showPopUpMessage(
        `cannot connect to ${connectionOptions.address}:${connectionOptions.port}`,
      );
    });
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
        <HelperText type="error" visible={ipAddressHasError(ipAddress)}>
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
        <HelperText type="error" visible={portHasError(port)}>
          Port is invalid!
        </HelperText>
      </View>

      <TouchableOpacity>
        <Button
          onPress={() => connectToServer()}
          disabled={
            portHasError(port) || ipAddressHasError(ipAddress) || isConnecting
          }
          style={{}}
          icon={isConnecting ? () => <ActivityIndicator /> : 'connection'}
          mode={'contained'}>
          {isConnecting ? 'Connecting' : 'Connect'}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionForm;
