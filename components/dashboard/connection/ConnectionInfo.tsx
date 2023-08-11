import {View} from 'react-native';
import {Banner, Button, Text} from 'react-native-paper';
import {useContext, useState} from 'react';
import {GlobalState} from '../../../GlobalState';

const ConnectionInfo = ({extend = false}) => {
  const {microcontroller} = useContext(GlobalState);
  const [visibleConnectionInfo, setVisibleConnectionInfo] = useState(extend);

  return (
    <View>
      <Banner visible={visibleConnectionInfo} actions={[]} icon={'connection'}>
        <View>
          <Text>{`Connected: ${microcontroller?.isReady}`} </Text>
          <Text>{`Address: ${microcontroller?.address}`}</Text>
          <Text>{`Port: ${microcontroller?.port}`}</Text>
        </View>
      </Banner>

      <Button
        icon={visibleConnectionInfo ? 'eye-off' : 'eye'}
        onPress={() => setVisibleConnectionInfo(!visibleConnectionInfo)}>
        {visibleConnectionInfo
          ? 'HIDE CONNECTION INFO'
          : 'SHOW CONNECTION INFO'}
      </Button>
    </View>
  );
};

export default ConnectionInfo;
