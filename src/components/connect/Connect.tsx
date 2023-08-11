import ConnectForm from './connect-form/ConnectForm'
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'
import {Snackbar, Text} from 'react-native-paper'
import PreviousConnections from './previous-connection/PreviousConnectionsList'
import React, {createContext, useEffect, useState} from 'react'
import LocalStorage from '../../common/utils/local-storage'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../../App'
import {IConnectionParams} from '../../common/types/connection-params.interface'
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types'

interface ISetFormValueContext {
  setIpAddress: React.Dispatch<React.SetStateAction<string>>
  setPort: React.Dispatch<React.SetStateAction<string>>
  setPreviousConnections: React.Dispatch<
    React.SetStateAction<IConnectionParams[]>
  >
}

export const SetFormValueContext = createContext<ISetFormValueContext>({
  setIpAddress(): void {},
  setPort(): void {},
  setPreviousConnections(): void {}
})

export const NavigationContext =
  createContext<NativeStackNavigationProp<any> | null>(null)

const previousConnectionsStorage = new LocalStorage('previousConnections')

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Connect'>

const Connect = ({navigation}: NavigationProps) => {
  const [ipAddress, setIpAddress] = useState('')
  const [port, setPort] = useState('')
  const [previousConnections, setPreviousConnections] = useState<
    IConnectionParams[]
  >([])

  const [visiblePopUp, setVisiblePopUp] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')

  const formSetValueState: ISetFormValueContext = {
    setIpAddress,
    setPort,
    setPreviousConnections
  }

  const showPopUpMessage = (message: string) => {
    setPopUpMessage(message)
    setVisiblePopUp(true)

    setTimeout(() => {
      setVisiblePopUp(false)
    }, 3000)
  }

  useEffect(() => {
    ;(async () => {
      const data = (await previousConnectionsStorage.read()) || []
      setPreviousConnections(data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      await previousConnectionsStorage.save(previousConnections)
    })()
  }, [previousConnections])

  return (
    <NavigationContext.Provider value={navigation}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text variant="displaySmall">Connect to server:</Text>
            </View>

            <SetFormValueContext.Provider value={formSetValueState}>
              <ConnectForm
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
          setPopUpMessage('')
        }}
        action={{
          label: 'Ok',
          onPress: () => {
            setVisiblePopUp(false)
          }
        }}>
        {popUpMessage}
      </Snackbar>
    </NavigationContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 26
  },
  header: {
    marginTop: 50,
    marginBottom: 30
  }
})

export default Connect
