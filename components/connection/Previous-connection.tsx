import {Button, List} from 'react-native-paper';
import {useContext} from 'react';
import {SetValueContext} from './context';
import {IPreviousConnection} from './Connection';

interface IProps {
  previousConnection: IPreviousConnection;
}
const PreviousConnection = ({previousConnection}: IProps) => {
  const {setIpAddress, setPort} = useContext(SetValueContext);
  const setConnection = () => {
    setIpAddress(previousConnection.address);
    setPort(previousConnection.port);
  };

  return (
    <List.Item
      title={previousConnection.address}
      description={`port: ${previousConnection.port}`}
      left={props => <List.Icon {...props} icon="server" />}
      right={() => <Button onPress={setConnection}>select</Button>}
    />
  );
};

export default PreviousConnection;
