import {useContext, useState} from 'react';
import {Button, List} from 'react-native-paper';
import PreviousConnection from './Previous-connection';
import {SetValueContext} from './context';
import {IPreviousConnection} from './Connection';
import {View} from 'react-native';

interface IProps {
  previousConnections: IPreviousConnection[];
}
const PreviousConnectionsList = ({previousConnections}: IProps) => {
  const {setPreviousConnections} = useContext(SetValueContext);
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={{marginTop: 26}}>
      <List.Accordion
        style={{backgroundColor: '#f2f2f2'}}
        title="Previous Connections"
        expanded={expanded}
        onPress={handlePress}>
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

export default PreviousConnectionsList;
