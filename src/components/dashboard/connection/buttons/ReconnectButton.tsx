import {TouchableOpacity} from 'react-native'
import {ActivityIndicator, Button} from 'react-native-paper'
import {useContext, useState} from 'react'
import {GlobalState} from '../../../../common/GlobalState'
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types'
import {connectToMicrocontroller} from '../../../../common/utils/connect-to-microcontroller'

interface IProps {
  navigation: NativeStackNavigationProp<any>
}

const ReconnectButton = ({navigation}: IProps) => {
  const {microcontroller, setMicrocontroller} = useContext(GlobalState)
  const [reconnecting, setReconnecting] = useState(false)

  const reconnect = async () => {
    setReconnecting(true)
    microcontroller?.connection.destroy()

    if (!microcontroller || !microcontroller.port || !microcontroller.address) {
      setReconnecting(false)
      navigation.navigate('Connect')
      return
    }

    try {
      const reconnectedMicrocontroller = await connectToMicrocontroller(
        microcontroller.address,
        microcontroller.port
      )
      if (setMicrocontroller) {
        setMicrocontroller(reconnectedMicrocontroller)
      }
    } catch (e) {
      if (setMicrocontroller) {
        navigation.navigate('Connect')
      }
    } finally {
      setReconnecting(false)
    }
  }

  return (
    <TouchableOpacity>
      <Button
        style={{marginBottom: 10}}
        icon={reconnecting ? () => <ActivityIndicator /> : 'reload'}
        mode={'contained'}
        onPress={() => reconnect()}
        disabled={reconnecting}>
        {reconnecting ? 'Reconnecting...' : 'Reconnect'}
      </Button>
    </TouchableOpacity>
  )
}

export default ReconnectButton
