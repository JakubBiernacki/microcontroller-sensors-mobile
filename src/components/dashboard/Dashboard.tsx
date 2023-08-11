import {BottomNavigation} from 'react-native-paper'
import {createContext, useContext, useState} from 'react'
import {GlobalState} from '../../common/GlobalState'
import Home from './Home'
import Connection from './connection/Connection'
import DevicesList from './devices/DevicesList'
import MicrocontrollerDevice from '../../server-connection/microcontroller/microcontroller-device'
import {RootStackParamList} from '../../App'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>

export const MicrocontrollerDevicesContext = createContext<
  MicrocontrollerDevice[]
>([])

const Dashboard = ({navigation}: NavigationProps) => {
  // const [devices, setDevices] = useState<MicrocontrollerDevice[]>([]);
  const [indexOfSelectedRoute, setIndexOfSelectedRoute] = useState(0)
  const [routes] = useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline'
    },
    {
      key: 'devices',
      title: 'Devices',
      focusedIcon: 'view-module',
      unfocusedIcon: 'view-module-outline'
    },
    {key: 'connection', title: 'Connection', focusedIcon: 'connection'}
  ])

  const {microcontroller} = useContext(GlobalState)

  if (!microcontroller) {
    navigation.navigate('Connect')
  }
  // dashboard.addListener('updated', () => {
  //   setDevices([...dashboard.devices]);
  // });

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    connection: () => <Connection navigation={navigation} />,
    devices: DevicesList
  })

  return (
    // <MicrocontrollerDevicesContext.Provider value={devices}>
    <BottomNavigation
      navigationState={{index: indexOfSelectedRoute, routes}}
      onIndexChange={setIndexOfSelectedRoute}
      renderScene={renderScene}
    />
    // </MicrocontrollerDevicesContext.Provider>
  )
}

export default Dashboard
