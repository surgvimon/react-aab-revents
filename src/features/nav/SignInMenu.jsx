import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Image, MenuItem } from 'semantic-ui-react'
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../app/firestore/firebaseService';

export default function SignInMenu() {  
  const {currentUserProfile} = useSelector(state => state.profile);
  const navigate = useNavigate();
   
  async function handleSignOut() {
    try {
      navigate('/');
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <MenuItem position="right">
        <Image avatar spaced="right" src={currentUserProfile?.photoURL || '/assets/user.png'}/>
        <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/create-event" text="Create Event" icon="plus"/>
                <Dropdown.Item as={Link} to={`/profile/${currentUserProfile?.id}`} text="My Profile" icon="user"/>
                <Dropdown.Item as={Link} to="/account"text="My Account" icon="setting"/>
                <Dropdown.Item
                  onClick={handleSignOut}
                  text='Sign out'
                  icon='power'
                />
            </Dropdown.Menu>
        </Dropdown>
    </MenuItem>

  )
}
