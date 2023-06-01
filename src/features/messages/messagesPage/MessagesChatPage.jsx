import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import MessagesChatHeader from '../messagesPage/MessagesChatHeader'
import MessagesChatContent from '../messagesPage/MessagesChatContent'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { getUserProfile } from '../../../app/firestore/firestoreService';
import { listenToSelectedUserProfile } from '../../profiles/profileActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function MessagesChatPage() {
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
        <Grid.Column width={10}>
          <MessagesChatContent 
              profile={selectedUserProfile}  
              isCurrentUser={currentUser.uid === selectedUserProfile.id}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <MessagesChatHeader 
              profile={selectedUserProfile}  
              isCurrentUser={currentUser.uid === selectedUserProfile.id}
          />

        </Grid.Column>
    </Grid>
</Container>
  )
}
