import {TouchableOpacity} from 'react-native'
import {ActivityIndicator, Button} from 'react-native-paper'
import {useContext, useState} from 'react'
import {GlobalState} from '../../../../common/GlobalState'
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types'
import {Microcontroller} from '../../../../server-connection/microcontroller/microcontroller'

interface IProps {
  navigation: NativeStackNavigationProp<any>
}

const ReconnectButton = ({navigation}: IProps) => {
  const {microcontroller, setMicrocontroller} = useContext(GlobalState)
  const [reconnecting, setReconnecting] = useState(false)

  const reconnect = () => {
    setReconnecting(true)
    if (
      !microcontroller ||
      !microcontroller?.port ||
      !microcontroller.address
    ) {
      setReconnecting(false)
      navigation.navigate('Connection')
      return
    }

    const reconnectedMicrocontroller = new Microcontroller(
      microcontroller.address,
      microcontroller.port
    )

    reconnectedMicrocontroller.addListener('connected', () => {
      if (setMicrocontroller) {
        setMicrocontroller(reconnectedMicrocontroller)
        setReconnecting(false)
      }
    })

    reconnectedMicrocontroller.addListener('timeout', () => {
      setReconnecting(false)
      navigation.navigate('Connection')
    })
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
