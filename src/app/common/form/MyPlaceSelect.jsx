import React from 'react';
import { useField } from 'formik';
import { FormField, Label, Dropdown } from 'semantic-ui-react';

export default function MyPlaceSelect({label, ...props}) {
    const [field, meta, helpers] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
        <label>{label}</label>
        <Dropdown
            fluid
            clearable
            search
            selection
            value={field.value || null} 
            onChange={(e, d) => helpers.setValue(d.value)} 
            onBlur={() => helpers.setTouched(true)} 
            {...props}
        />
        {meta.touched && meta.error ? (
            <Label basic color='red'>{meta.error}</Label>
        ) : null}
    </FormField>
  )
}
