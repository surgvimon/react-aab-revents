import React from 'react';
import { Header, Segment, Button, Container } from 'semantic-ui-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cuid from 'cuid';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form} from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput'
import * as Yup from 'yup'
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default function EventFrom(setFormOpen) {
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

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required(),
        // city: Yup.object().shape({
        //   address: Yup.string().required('City is required'),
        // }),
        // venue: Yup.object().shape({
        //   address: Yup.string().required('Venue is required'),
        // }),
        // date: Yup.string().required(),
    });

  return (
    <Container className="main">
    <Segment clearing>
        <Header content={selectedEvent ? "Edit the Event" : "Create new event"}/>
        <Formik 
            initialValues ={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                selectedEvent 
                    ? dispatch(updateEvent ({...selectedEvent, ...values}))
                    : dispatch(createEvent({...values, id: cuid(), hostedBy: 'Wan', attendees: [], hostPhotoURL: '/assets/user.png'}));
                navigate('/events');
            }}
        >
            {({isSubmitting, dirty, isValid}) =>(
                <Form  className="ui form">
                <Header sub color='teal' content='Event Details'/>
                <MyTextInput name='title' placeholder="Event Title" />
                <MySelectInput name='category' placeholder="Event Category" options={categoryData}/>
                <MyTextArea name='description' placeholder="Description" rows={5}/>
                <Header sub color='teal' content='Event Location'/>
                <MyTextInput name='city' placeholder="City" />
                <MyTextInput name='venue' placeholder="Venue" />
                <MyDateInput 
                    name='date' 
                    placeholderText="Event Date"
                    timeFormat="HH:mm"
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm a'
                />
                <Button 
                    loading={isSubmitting} 
                    disabled={!isValid || !dirty || isSubmitting} 
                    type="submit" 
                    floated="right" 
                    positive 
                    content="Submit"
                />
                <Button 
                    disabled={isSubmitting}
                    as={Link} 
                    to="/events" 
                    type="submit" 
                    floated="right"  
                    content="Cancel"
                />
            </Form>


            )}
        </Formik>
    </Segment>
    </Container>
  )
}
