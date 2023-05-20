import React from 'react';
import { useField } from 'formik';
import { FormField, Label} from 'semantic-ui-react';

export default function MyPlaceInput({label, options, ...props}) {
  const [field, meta, helpers] = useField(props);
  // function handleInputChange(value){
  //   helpers.setValue({address, latLng})
  // }
  return (
        <>
          {/* <input 
              type="text" 
              placeholder="Category"
              name="category"
              value={field.value['address']}
              onChange={(value) => helpers.setValue({address: value})}
          /> */}
          {({getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <input {...getInputProps({name: field.name, ...props})}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
          </FormField>

          )}
        </>
  )
}
