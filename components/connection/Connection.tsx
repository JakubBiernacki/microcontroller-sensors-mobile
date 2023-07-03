import ConnectionForm from './ConnectionForm';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import PreviousConnections from './previous/PreviousConnectionsList';
import {useEffect, useState} from 'react';
import {getDataObject, storeDataObject} from '../../utils/storage';
import {NavigationContext, SetFormValueContext} from './context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {IConnectionOption} from '../../types/connection-option.interface';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Connection'>;

const Connection = ({navigation}: NavigationProps) => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('');
  const [previousConnections, setPreviousConnections] = useState<
    IConnectionOption[]
  >([]);
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  const formSetValueState = {setIpAddress, setPort, setPreviousConnections};

  const showPopUpMessage = (message: string) => {
    setPopUpMessage(message);
    setVisiblePopUp(true);

    setTimeout(() => {
      setVisiblePopUp(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchConnectionHistory = async () => {
      const data = await getDataObject('previousConnections');
      if (data instanceof Array && data.length > 0) {
        setPreviousConnections(data);
      }
    };
    fetchConnectionHistory();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await storeDataObject('previousConnections', previousConnections);
    };
    saveData();
  }, [previousConnections]);

  return (
    <NavigationContext.Provider value={navigation}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text variant="displaySmall">Connect to server:</Text>
            </View>

            <SetFormValueContext.Provider value={formSetValueState}>
              <ConnectionForm
                ipAddress={ipAddress}
                port={port}
                showPopUpMessage={showPopUpMessage}
              />

              <PreviousConnections previousConnections={previousConnections} />
            </SetFormValueContext.Provider>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Snackbar
        visible={visiblePopUp}
        onDismiss={() => {
          setPopUpMessage('');
        }}
        action={{
          label: 'Ok',
          onPress: () => {
            setVisiblePopUp(false);
          },
        }}>
        {popUpMessage}
      </Snackbar>
    </NavigationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 26,
  },
  header: {
    marginTop: 50,
    marginBottom: 30,
  },
});

export default Connection;
