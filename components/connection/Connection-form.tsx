import {TouchableOpacity, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {useContext} from 'react';
import {SetValueContext} from './context';

interface IProps {
  ipAddress: string;
  port: string;
}

const ConnectionForm = ({ipAddress, port}: IProps) => {
  const {setIpAddress, setPort, setPreviousConnections} =
    useContext(SetValueContext);
  const connectToServer = () => {
    const connection = {
      address: ipAddress,
      port: port,
    };

    setPreviousConnections(value => [...value, connection]);
  };

  const ipAddressHasError = () => {
    const regexExp =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

    const isValid = regexExp.test(ipAddress);
    return !isValid;
  };

  const portHasError = () => {
    const regexExp =
      /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/gi;

    const isValid = regexExp.test(port);
    return !isValid;
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
        <HelperText type="error" visible={ipAddressHasError()}>
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
        <HelperText type="error" visible={portHasError()}>
          Port is invalid!
        </HelperText>
      </View>

      <TouchableOpacity>
        <Button
          onPress={() => connectToServer()}
          disabled={portHasError() || ipAddressHasError()}
          style={{}}
          icon={'connection'}
          mode={'contained'}>
          Connect
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionForm;
