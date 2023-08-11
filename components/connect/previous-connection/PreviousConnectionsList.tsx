import {useContext, useState} from 'react';
import {Button, List} from 'react-native-paper';
import PreviousConnection from './PreviousConnection';
import {SetFormValueContext} from '../Connect';
import {StyleSheet, View} from 'react-native';
import {IConnectionParams} from '../../../types/connection-params.interface';

interface IProps {
  previousConnections: IConnectionParams[];
}
const PreviousConnectionsList = ({previousConnections}: IProps) => {
  const {setPreviousConnections} = useContext(SetFormValueContext);
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.previousConnectionContainer}>
      <List.Accordion
        style={styles.previousConnectionList}
        title="Previous Connections"
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}>
        {previousConnections.map((previousConnection, index) => (
          <PreviousConnection
            key={index}
            previousConnection={previousConnection}
          />
        ))}
        {previousConnections.length ? (
          <Button textColor={'red'} onPress={() => setPreviousConnections([])}>
            Clear history
          </Button>
        ) : null}
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  previousConnectionContainer: {
    marginTop: 26,
  },
  previousConnectionList: {
    backgroundColor: '#f2f2f2',
  },
});

export default PreviousConnectionsList;
