import {List} from 'react-native-paper'
import {Dispatch, SetStateAction, useState} from 'react'
import MicrocontrollerDevice from '../../../server-connection/microcontroller/microcontroller-device'

const dataTypeToIcon: Record<string, string> = {
  is_pressed: 'led-on',
  humidity: 'water-percent',
  max_temperature: 'thermometer-high',
  min_temperature: 'thermometer-low',
  temperature: 'thermometer'
}

interface IProps {
  device: MicrocontrollerDevice
  defaultExpanded: boolean
  setExpandedDevicesPins: Dispatch<SetStateAction<number[]>>
}
const Device = ({device, defaultExpanded, setExpandedDevicesPins}: IProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [deviceData, setDeviceData] = useState(device.data)

  device.addListener('updated', () => {
    setDeviceData(device.data)
  })

  const handlePress = () => {
    if (expanded) {
      setExpandedDevicesPins(current =>
        current.filter(pin => pin !== device.pin)
      )
    } else {
      setExpandedDevicesPins(current => [...current, device.pin])
    }

    setExpanded(!expanded)
  }

  return (
    <List.Accordion
      expanded={expanded}
      onPress={handlePress}
      title={device.type}
      description={`PIN: ${device.pin}`}
      left={props => (
        <List.Icon
          {...props}
          color={device.online ? 'green' : 'red'}
          icon="select-inverse"
        />
      )}>
      {Object.keys(deviceData).map(key => {
        let title = deviceData[key].toString()
        const icon = dataTypeToIcon[key] || 'alert-circle'

        if (key.includes('temperature')) {
          title = `${title} ℃`
        } else if (key.includes('humidity')) {
          title = `${title} %`
        }
        return (
          <List.Item
            key={key}
            title={title}
            description={key}
            left={props => <List.Icon {...props} icon={icon} />}
          />
        )
      })}
    </List.Accordion>
  )
}

export default Device
