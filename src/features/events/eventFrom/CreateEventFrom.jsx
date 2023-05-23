import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup'
import { Button, Container, Form, Header, Segment } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyPlaceSelect from '../../../app/common/form/MyPlaceSelect';
import MyNumInput from '../../../app/common/form/MyNumInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { categoryData } from '../../../app/api/categoryOptions';
import { countryData } from '../../../app/api/cityOptions';
import { useDispatch, useSelector } from 'react-redux';


export default function CreateEventFrom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();
    const selectedEvent = useSelector(state =>state.event.events.find(e => e.id === param.id))
    const initialValues = {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        lat: '',
        lng: '',
        date: '',
    }

    // const validationSchema = Yup.object({
    //     title: Yup.string().required('You must provide a title'),
    //     category: Yup.string().required('You must provide a category'),
    //     description: Yup.string().required(),
    //     city: Yup.string().required(),
    //     venue: Yup.string().required(),
    //     lat: Yup.number().required(),
    //     lng: Yup.number().required(),
    //     date: Yup.string().required(),
    // });

  return (
    <Container className="main">
    <Segment clearing>
        <Header content="Create new event"/>
        <Formik 
        >
            {({isSubmitting, dirty, isValid}) =>(
                <Form  className="ui form">
                <Header sub color='teal' content='Event Details'/>
                <MyTextInput name='title' placeholder="Event Title" />
                <MySelectInput name='category' placeholder="Event Category" options={categoryData}/>
                <MyTextArea name='description' placeholder="Description" rows={5}/>
                <Header sub color='teal' content='Event Location'/>
                <MyPlaceSelect name='city' placeholder='City' options={countryData}/>
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
