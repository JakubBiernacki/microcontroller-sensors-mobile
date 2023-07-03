import {SafeAreaView, ScrollView, View} from 'react-native';
import {Avatar, Card, IconButton, Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useContext, useState} from 'react';
import {GlobalState} from '../../GlobalState';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Monitor'>;
const Monitor = ({navigation, route}: NavigationProps) => {
  const {microcontrollerConnection} = useContext(GlobalState);
  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);

  microcontrollerConnection?.addListener('jsonData', data => {
    for (const key of Object.keys(data)) {
      if (key.includes('DHT11')) {
        setHum(data[key]?.humidity);
      } else if (key.includes('DS18X20')) {
        setTemp(data[key]?.temperature);
      }
    }
  });
  console.log('monitor');

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 26}}>
          <Text>Connection info</Text>
          <Text>{`Connected: ${microcontrollerConnection?.isReady}`} </Text>
          <Text>{`Address: ${microcontrollerConnection?.address}`}</Text>
          <Text>{`Port: ${microcontrollerConnection?.port}`}</Text>
        </View>
        <View style={{padding: 26}}>
          <Text variant="displayMedium">Live sensors:</Text>
          <Card.Title
            title={`${temp} ℃`}
            subtitle="temperature"
            left={props => <Avatar.Icon {...props} icon="thermometer" />}
            right={props => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />

          <Card.Title
            title={`${hum} %`}
            subtitle="humidity"
            left={props => <Avatar.Icon {...props} icon="water-percent" />}
            right={props => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Monitor;
