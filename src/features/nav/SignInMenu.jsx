import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Image, MenuItem } from 'semantic-ui-react'
import { signOutUser } from '../auth/authActions';

export default function SignInMenu() {  
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.auth);
  const navigate = useNavigate();
  return (
    <MenuItem position="right">
        <Image avatar spaced="right" src={currentUser.photoURL || '/assets/user.png'}/>
        <Dropdown pointing="top left" text={currentUser.email}>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/create-event" text="Create Event" icon="plus"/>
                <Dropdown.Item text="My Profile" icon="user"/>
                <Dropdown.Item
                  onClick={() => {
                    dispatch(signOutUser());
                    navigate('/');
                  }}
                  text='Sign out'
                  icon='power'
                />
            </Dropdown.Menu>
        </Dropdown>
    </MenuItem>

  )
}
