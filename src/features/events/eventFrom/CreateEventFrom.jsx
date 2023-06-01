import React, { useState } from 'react';
import { Header, Segment, Button, Container } from 'semantic-ui-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form} from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput'
import * as Yup from 'yup'
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { countryData } from '../../../app/api/cityOptions';
import MyNumInput from '../../../app/common/form/MyNumInput';
import { addEventToFirestore, cancelEventToggle } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function CreateEventFrom() {
    const navigate = useNavigate();
    // const { selectedEvent } = useSelector((state) => state.event);
    // const selectedEvent = useSelector(state =>state.event.events.find(e => e.id === param.id))
    const {loading, error} = useSelector(state => state.async)

    const initialValues =  {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        lat: '',
        lng: '',
        date: '',
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        lat: Yup.number().required(),
        lng: Yup.number().required(),
        date: Yup.string().required(),
    });

    if (loading)
    return <LoadingComponent content='Loading event...' />;
  
    if (error) return <Navigate replace to="/error" />;
  

  return (
    <Container className="main">
    <Segment clearing>
        <Header content={"Create new event"}/>
        <Formik 
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addEventToFirestore(values);
            setSubmitting(false);
            navigate('/events');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
        >
            {({isSubmitting, dirty, isValid}) =>(
                <Form  className="ui form">
                <Header sub color='teal' content='Event Details'/>
                <MyTextInput name='title' placeholder="Event Title" />
                <MySelectInput name='category' placeholder="Event Category" options={categoryData}/>
                <MyTextArea name='description' placeholder="Description" rows={5}/>
                <Header sub color='teal' content='Event Location'/>
                {/* <MyPlaceSelect name='city' placeholder='City' options={countryData}/> */}
                <MySelectInput name='city' placeholder="City" options={countryData}/>
                <MyTextInput name='venue' placeholder="Address" />
                <div className='Grid'>
                    <div><MyNumInput name='lat' placeholder="Lat"/></div>
                    <div><MyNumInput name='lng' placeholder="Lng"/></div>
                </div>
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
