import React from 'react';
import { useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';

export default function MyNumInput({label, ...props}) {
    const [field, meta, helpers] = useField(props);
    // console.log(field)
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <input 
                field = 'number'
                type="number"
                {...field} 
                {...props} 
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </FormField>
    )
}