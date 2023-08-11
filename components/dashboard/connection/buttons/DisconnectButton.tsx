import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {useContext} from 'react';
import {GlobalState} from '../../../../GlobalState';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const DisconnectButton = ({navigation}: IProps) => {
  const {microcontroller, setMicrocontroller} = useContext(GlobalState);

  const disconnect = () => {
    microcontroller?.connection._socket?.destroy();
    if (setMicrocontroller) {
      setMicrocontroller(undefined);
    }
    navigation.navigate('Connect');
  };

  return (
    <TouchableOpacity>
      <Button
        icon={'exit-to-app'}
        mode={'contained'}
        buttonColor={'#F44336'}
        onPress={() => disconnect()}>
        Disconnect
      </Button>
    </TouchableOpacity>
  );
};

export default DisconnectButton;
