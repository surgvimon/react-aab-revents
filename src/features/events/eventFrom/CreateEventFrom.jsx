import React, { useState } from 'react';
import { Header, Segment, Form, Input, Button, Container } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../eventActions';

export default function CreateEventFrom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();
    const selectedEvent = useSelector(state =>state.event.events.find(e => e.id === param.id))
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
    }
    const [values, setValues] = useState(initialValues);
    function handleFormSubmit (){
        dispatch(createEvent({...values, id: cuid(), hostedBy: 'Wan', attendees: [], hostPhotoURL: '/assets/user.png'}));
        navigate('/events');
    }
    function handleInputChange(e){
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }
  return (
    <Container className="main">
    <Segment clearing>
        <Header content={selectedEvent ? "Edit the Event" : "Create new event"}/>
        <Form onSubmit={handleFormSubmit}>
            <Form.Field>
                <Input 
                    type="text" 
                    placeholder="Event title"
                    name="title"
                    value={values.title}
                    onChange={(e) => handleInputChange(e)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type="text" 
                    placeholder="Category"
                    name="category"
                    value={values.category}
                    onChange={(e) => handleInputChange(e)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type="text" 
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChange={(e) => handleInputChange(e)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type="text" 
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={(e) => handleInputChange(e)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type="text" 
                    placeholder="Venue"
                    name="venue"
                    value={values.venue}
                    onChange={(e) => handleInputChange(e)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    type="date" 
                    placeholder="Date"
                    name="date"
                    value={values.date}
                    onChange={(e) => handleInputChange(e)}
                />
            </Form.Field>
            <Button type="submit" floated="right" positive content="Submit"/>
            <Button as={Link} to="/events" type="submit" floated="right"  content="Cancel"/>
        </Form>
    </Segment>
    </Container>
  )
}
