import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'
import {useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function EventDetailedPage() {
  const param = useParams();
  // const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === param.id)
  );
  return (
    <>
    <Container className="main">
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} />
          <EventDetailedInfo event={event}/>
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={event.attendees}/>
        </Grid.Column>
      </Grid>
    </Container>
    
    </>
  )
}
