import {ScrollView, StyleSheet, View} from 'react-native';
import {List, Text} from 'react-native-paper';
import Device from './Device';
import {useContext, useState} from 'react';
import {MicrocontrollerDevicesContext} from '../Dashboard';

const DevicesList = () => {
  const devices = useContext(MicrocontrollerDevicesContext);
  const [expandedDevicesPins, setExpandedDevicesPins] = useState<number[]>([]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text variant="displayMedium">Devices:</Text>
        </View>

        <View>
          <List.Section title={`devices count: ${devices.length}`}>
            {devices.map(device => (
              <Device
                key={device.pin}
                device={device}
                defaultExpanded={expandedDevicesPins.includes(device.pin)}
                setExpandedDevicesPins={setExpandedDevicesPins}
              />
            ))}
          </List.Section>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 26,
  },
});

export default DevicesList;
