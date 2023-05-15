import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Image, MenuItem } from 'semantic-ui-react'

export default function SignInMenu({signOut}) {  
  return (
    <MenuItem position="right">
        <Image avatar spaced="right" src="/assets/user.png"/>
        <Dropdown pointing="top left" text='Bob'>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/create-event" text="Create Event" icon="plus"/>
                <Dropdown.Item text="My Profile" icon="user"/>
                <Dropdown.Item onClick={signOut} text="Sign out" icon="power"/>
            </Dropdown.Menu>
        </Dropdown>
    </MenuItem>

  )
}
