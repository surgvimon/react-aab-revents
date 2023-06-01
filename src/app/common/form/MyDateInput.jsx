import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormField, Label} from 'semantic-ui-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import th from "date-fns/locale/th";
import 'react-datepicker/dist/react-datepicker.css';

export default function MyDateInput({label, ...props}) {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props);
    registerLocale("th", th);
  return (
    <FormField>
        <label>{label}</label>
        <DatePicker  
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={value => setFieldValue(field.name, value)}
        locale="th"
        />
        {meta.touched && meta.error ? (
            <Label basic color='red'>{meta.error}</Label>
        ) : null}
    </FormField>
  )
}
