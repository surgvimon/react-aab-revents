import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToSelectedUserProfile } from '../profileActions';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function ProfilePage() {
  const param = useParams();
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  let profile;

  useFirestoreDoc({
    query: () => getUserProfile(param.id),
    data: profile => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, param.id]
  })
  if((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) return <LoadingComponent content='Loading profile..' />
  return (
    <Container className='main'>
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader 
                  profile={selectedUserProfile}  
                  isCurrentUser={currentUser.uid === selectedUserProfile.id}
                />
                <ProfileContent 
                  profile={selectedUserProfile}  
                  isCurrentUser={currentUser.uid === selectedUserProfile.id}
                />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
        </Grid>
    </Container>
  )
}
