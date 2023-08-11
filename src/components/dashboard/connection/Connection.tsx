import {SafeAreaView, StyleSheet, View} from 'react-native'
import ConnectionInfo from './ConnectionInfo'
import DisconnectButton from './buttons/DisconnectButton'
import ReconnectButton from './buttons/ReconnectButton'
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types'

interface IProps {
  navigation: NativeStackNavigationProp<any>
}
const Connection = ({navigation}: IProps) => {
  return (
    <SafeAreaView>
      <View>
        <ConnectionInfo extend={true} />

        <View style={styles.buttons}>
          <ReconnectButton navigation={navigation} />
          <DisconnectButton navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttons: {padding: 26}
})

export default Connection
