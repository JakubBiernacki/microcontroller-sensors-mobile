import {useContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import {Avatar, Card, IconButton, Text} from 'react-native-paper'
import {MicrocontrollerDevicesContext} from './Dashboard'

const Home = () => {
  // const {microcontroller} = useContext(GlobalState)

  const devices = useContext(MicrocontrollerDevicesContext)
  const [temp, setTemp] = useState(0)
  const [hum, setHum] = useState(0)

  useEffect(() => {
    const humDevice = devices.find(device => device.type === 'dht11')
    const tempDevice = devices.find(device => device.type === 'ds18x20')
    setHum(humDevice?.data.humidity || 0)
    setTemp(tempDevice?.data.temperature || 0)

    humDevice?.addListener('updated', () => {
      setHum(humDevice?.data.humidity)
    })

    tempDevice?.addListener('updated', () => {
      setTemp(tempDevice?.data.temperature)
    })
  }, [devices])

  return (
    <View>
      <View style={{padding: 26}}>
        <Text variant="displayMedium">Live sensors:</Text>
        <Card.Title
          title={`${temp} ℃`}
          subtitle="temperature"
          left={props => <Avatar.Icon {...props} icon="thermometer" />}
          right={props => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />

        <Card.Title
          title={`${hum} %`}
          subtitle="humidity"
          left={props => <Avatar.Icon {...props} icon="water-percent" />}
          right={props => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
      </View>
    </View>
  )
}

export default Home
