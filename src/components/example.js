import { useBooleanKnob } from '@stardust-ui/docs-components'
import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

const SidebarExampleDimmed = () => {
  const [visible, setVisible] = useBooleanKnob({ name: 'visible' })

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='slide along'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
          EX
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          MX
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          CX
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={visible}>
        <Segment basic>
          <Header as='h3'>Application Content</Header>
          <Image src='https://react.semantic-ui.comhttps://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarExampleDimmed
