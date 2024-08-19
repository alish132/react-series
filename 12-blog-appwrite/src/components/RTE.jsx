import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name || 'content'}   // Name of the input field.
        control={control}    // This control comes from useForm(). Which means react-hook-form is responsible for its control.
        defaultValue={defaultValue} // Initial value of the Conroller which is empty.
        // render function allow us to rendered the controlled Component(Input component).
        // onchange: function update the form state(value) with new value.
        // value: represent the current value of the form state.
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value} // Editor value is set to form state value.
            apiKey='b9g6dg70k52vjzy3sclgxpnmwsttc2tnr1kwwp9ttzm7c8za'
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | blocks | image | bold italic forecolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica, Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={onChange}  // If user type anything in the Editor then render onchange function will immediately triggerd and it update the form state with the value that user has given in Editor
          />
        )}
      />
    </div>
  );
}


