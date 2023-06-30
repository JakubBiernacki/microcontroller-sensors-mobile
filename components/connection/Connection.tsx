import ConnectionForm from './Connection-form';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import PreviousConnections from './Previous-connections-list';
import {useEffect, useState} from 'react';
import {getDataObject, storeDataObject} from '../../utils/storage';
import {SetValueContext} from './context';

export interface IPreviousConnection {
  address: string;
  port: string;
}

const Connection = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('');
  const [previousConnections, setPreviousConnections] = useState<
    IPreviousConnection[]
  >([]);

  const fetchData = async () => {
    // get the data from the api
    const data = await getDataObject('previousConnections');
    console.log(`fetched: ${data}`);
    if (data instanceof Array && data.length > 0) {
      setPreviousConnections(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await storeDataObject('previousConnections', previousConnections);
    };

    saveData();
  }, [previousConnections]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 26}}>
          <View style={{marginTop: 50, marginBottom: 30}}>
            <Text variant="displaySmall">Connect to server:</Text>
          </View>

          <SetValueContext.Provider
            value={{setIpAddress, setPort, setPreviousConnections}}>
            <ConnectionForm ipAddress={ipAddress} port={port} />

            <PreviousConnections previousConnections={previousConnections} />
          </SetValueContext.Provider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Connection;
