import React, { useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import ProfileForm from './ProfileForm';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getUserEventsQuery } from '../../../app/firestore/firestoreService';
import { listenToUserEvents } from '../profileActions';

export default function EventsTab({profile}) {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const { profileEvents } = useSelector((state) => state.profile);
    const { loading } = useSelector((state) =>state.async);

    useFirestoreCollection({
        query: () => getUserEventsQuery(activeTab, profile.id),
        data: events => dispatch(listenToUserEvents(events)),
        deps: [dispatch, activeTab, profile.id]
    })

    const panes = [
        { menuItem: 'Future Events', pane:{key: 'future'}},
        { menuItem: 'Past Event', pane: {key: 'past'}},
        { menuItem: 'Hosting', pane: {key: 'hosting'}}
    ]
  return (
    <Tab.Pane loading={loading}>
    <Grid>
        <Grid.Column width={16}> 
        <Header 
            floated='left'
            icon='calendar'
            content='Events'
        />
               
        </Grid.Column>
        <Grid.Column width={16}> 
            <Tab 
                onTabChange={(e, data) => setActiveTab(data.activeIndex)}
                panes={panes}
                menu={{secondary: true, pointing: true}}
            />
            <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}> 
                {profileEvents.map((event) => (
                    <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                        <Image src={`/assets/categoryImages/${event.category}.jpg`} style={{ minHeight: 100, objectFit: 'cover' }}/>
                        <Card.Content>
                            <Card.Header content={event.title} textAlign='center'/>
                            <Card.Meta textAlign='center'>
                                <div>{format(event.date, 'MMMM d, ', { locale: th })}{String(Number(format(event.date, 'yyyy')) + 543)}</div>
                                <div>{format(event.date, 'hh:mm a', { locale: th })}</div>
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Grid.Column>
    </Grid>
    </Tab.Pane> 

  )
}

