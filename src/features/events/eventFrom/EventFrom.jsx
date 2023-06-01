import React, { useState } from 'react';
import { Header, Segment, Button, Container, Confirm } from 'semantic-ui-react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  listenToEvents } from '../eventActions';
import { Formik, Form} from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput'
import * as Yup from 'yup'
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { countryData } from '../../../app/api/cityOptions';
import MyNumInput from '../../../app/common/form/MyNumInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { addEventToFirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventFrom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();
    const location = useLocation();
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    // const { selectedEvent } = useSelector((state) => state.event);
    const selectedEvent = useSelector(state =>state.event.events.find(e => e.id === param.id))
    const {loading, error} = useSelector(state => state.async)

    const initialValues = selectedEvent ?? {
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
    async function handleCancelToggle(event) {
      setConfirmOpen(false);
      setLoadingCancel(true);
      try {
        await cancelEventToggle(event);
        setLoadingCancel(false);
      } catch (error) {
        setLoadingCancel(true);
        toast.error(error.message);
      }
    }

    useFirestoreDoc({
      shouldExecute: !!param.id !== selectedEvent?.id && location.pathname !== '/createEvent',
        query: () => listenToEventFromFirestore(param.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps: [param.id, dispatch],
    });
    
    if (loading || (!selectedEvent && !error))
    return <LoadingComponent content='Loading event...' />;
  
    if (error) return <Navigate replace to="/error" />;
  

  return (
    <Container className="main">
    <Segment clearing>
        <Header content={selectedEvent ? "Edit the Event" : "Create new event"}/>
        <Formik 
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
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
                {selectedEvent && (
                  <Button
                    loading={loadingCancel}
                    type='button'
                    floated='left'
                    color={selectedEvent.isCancelled ? 'green' : 'red'}
                    content={
                      selectedEvent.isCancelled
                        ? 'Reactivate event'
                        : 'Cancel Event'
                    }
                    onClick={() => setConfirmOpen(true)}
                  />
                )}
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
        <Confirm
        content={
          selectedEvent?.isCancelled
            ? 'This will reactivate the event - are you sure?'
            : 'This will cancel the event - are you sure?'
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
    
    </Container>
  )
}
