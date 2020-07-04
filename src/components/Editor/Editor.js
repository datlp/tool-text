import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
}));
const Editor = ({ onChange, placeholder, isTitle }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const quillModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'],
      ],
    },
  };

  const handleChange = (value) => {
    if (typeof onChange === 'function') {
      onChange(value);
    }
    setValue(value);
  };
  const options = {
    className: classes.root,
    theme: 'snow',
    formats: Editor.formats,
    placeholder: placeholder || 'Write Something',
    value: value || '',
    onChange:
      (isTitle ? value.length < 4000 && handleChange : handleChange) || null,
    modules: quillModules,
  };
  return <ReactQuill {...options} />;
};

export default Editor;
