import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'
import SignOutMenu from './SignOutMenu'
import SignInMenu from './SignInMenu'

export default function NavBar({setFormOpen}) {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    function handleSignOut(){
        setAuthenticated(false);
        navigate('/');
    }
  return (
    <Menu inverted fixed='top'>
        <Container>
            <MenuItem as={NavLink} to="/" header>
                <img src="./assets/logo.png" alt="logo" style={{ marginRight: 15 }}/>
                Re-vents
            </MenuItem>
            <MenuItem as={NavLink} to="/events" name="Events" />
            <MenuItem as={NavLink} to="/sandbox" name="Sandox" />
            <MenuItem as={NavLink} to="/create-event" >
                <Button positive inverted content="Create Event" />
            </MenuItem>
            {authenticated ? <SignInMenu signOut={handleSignOut} /> : <SignOutMenu setAuthenticated={setAuthenticated} />}
        </Container>
    </Menu>
  )
}
