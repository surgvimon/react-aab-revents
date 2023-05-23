import React, { useState } from 'react';
import { Header, Segment, Form, Input, Button, Container } from 'semantic-ui-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../eventActions';

export default function UpdateEventFrom() {
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
        console.log(param.id)
        dispatch(updateEvent ({...selectedEvent, ...values}))
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
