import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, IconButton, Text} from 'react-native-paper';
import {GlobalState} from '../../GlobalState';

const Home = () => {
  const {microcontroller} = useContext(GlobalState);

  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);

  microcontroller?.addListener('ready', () => {
    const humDevice = microcontroller?.getDeviceByType('dht11');
    setHum(humDevice?.data.humidity);

    humDevice?.addListener('updated', () => {
      setHum(humDevice.data.humidity);
    });

    const tempDevice = microcontroller?.getDeviceByType('ds18x20');
    setTemp(tempDevice?.data.temperature);

    tempDevice?.addListener('updated', () => {
      setTemp(tempDevice.data.temperature);
    });
  });

  // useEffect(() => {
  //   for (const device of devices) {
  //     if (device.type === 'dht11') {
  //       setHum(device.data.humidity);
  //     } else if (device.type === 'ds18x20') {
  //       setTemp(device.data.temperature);
  //     }
  //   }
  // }, [devices]);

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {padding: 26, flex: 1},
});

export default Home;
