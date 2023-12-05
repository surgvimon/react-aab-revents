import React from 'react'
import { Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react'
import MyTextArea from '../../../app/common/form/MyTextArea'

export default function EventDetailedChatFormTest({eventId}) {
  return (
    <Formik 
      initialValues={{comment: ''}}
      onSubmit={(values, { setSubmitting, resetForm}) => {
        try {
          //await addEventChatComment(eventId, values.comment)
          console.log(values.comment);
          resetForm();
        } catch (error) { 
          console.log(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
      >
      {({ isSubmitting }) => (
        <Form className='ui form'>
          <MyTextArea
              name='comment'
              placeholder='Please enter your comment here'
              rows={2}
          />
          <Button 
              loading={isSubmitting} 
              content='Add reply' 
              icon='edit' 
              primary 
              type='submit' 
          />
        </Form>
      )}
    </Formik>
  )
}
