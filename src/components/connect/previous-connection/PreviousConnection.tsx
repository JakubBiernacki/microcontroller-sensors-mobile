import {Button, List} from 'react-native-paper'
import {useContext} from 'react'
import {SetFormValueContext} from '../Connect'
import {IConnectionParams} from '../../../common/types/connection-params.interface'

interface IProps {
  previousConnection: IConnectionParams
}
const PreviousConnection = ({previousConnection}: IProps) => {
  const {setIpAddress, setPort} = useContext(SetFormValueContext)
  const setConnection = () => {
    setIpAddress(previousConnection.address)
    setPort(`${previousConnection.port}`)
  }

  return (
    <List.Item
      title={previousConnection.address}
      description={`port: ${previousConnection.port}`}
      left={props => <List.Icon {...props} icon="server" />}
      right={() => <Button onPress={setConnection}>select</Button>}
    />
  )
}

export default PreviousConnection
