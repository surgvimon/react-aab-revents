import { Formik } from 'formik';
import React from 'react'
import { Button, Form } from 'semantic-ui-react';
import MyTextArea from '../../../app/common/form/MyTextArea';

  export default function ChatFrom() {
    const initialValues =  {
      comment: '',
  }

  // const validationSchema = Yup.object({
  //     title: Yup.string().required('You must provide a title'),
  // });
  return (
    <Formik 
    enableReinitialize
    initialValues={initialValues}
    onSubmit={async (values, { setSubmitting }) => {
      try {
        console.log('hi')
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    }}
    >
        {({isSubmitting, dirty, isValid}) =>(
            <Form  className="ui form">
            <MyTextArea name='comment' placeholder="Comment" rows={2}/>
            <Button 
                loading={isSubmitting} 
                disabled={!isValid || !dirty || isSubmitting} 
                type="submit" 
                floated="right" 
                positive 
                content="Submit"
            />
        </Form>
        )}
    </Formik>

  )
}
