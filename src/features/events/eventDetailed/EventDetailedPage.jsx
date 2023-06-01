import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'
import {useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import {  listenToEventFromFirestore } from '../../../app/firestore/firestoreService'
import { listenToEvents } from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'

export default function EventDetailedPage() {
  const param = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === param.id)
  );
  const { loading, error } = useSelector((state) => state.async);
  const isHost = event?.hostUid === currentUser?.uid;
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(param.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [param.id, dispatch]
  });
  
  // useEffect(() => {
  //   dispatch(asyncActionStart());
  //   const unsubscribe = onSnapshot(listenToEventFromFirestore(param.id),
  //       snapshot => {
  //           if (!snapshot.exists) {
  //               dispatch(asyncActionError({code: 'not-found', message: 'Could not find document'}));
  //               return;
  //           }
  //           // console.log(dataFromSnapshot(snapshot));
  //           dispatch(asyncActionFinish());
  //       },
  //       error => dispatch(asyncActionError())
  //   );
    
  //   return () => {
  //     unsubscribe()
  //     }
  // },[param.id, dispatch])

  if (loading || (!event && !error))
  return <LoadingComponent content='Loading event...' />;

  if (error || !currentUser) return <Navigate replace to="/error" />;

  return (
    <>
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
          <EventDetailedInfo event={event}/>
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
        <EventDetailedSidebar
          attendees={event?.attendees}
          hostUid={event.hostUid}
          currentUser={currentUser.uid}
        />
        </Grid.Column>
      </Grid>
    </Container>
    
    </>
  )
}
