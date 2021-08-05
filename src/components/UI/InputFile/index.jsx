// Dependencies
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

// Styles
import { Layout, EPicture, EPictureInput, Label } from './styles';

// Assets
import { CameraOutline } from 'react-ionicons';

function InputFile({ label = '', value = null, width = '70px', height = '70px', onChange = () => {} }) {
  const [base64, setBase64] = useState(value);

  useEffect(() => {
    setBase64(value);
  }, [value]);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        onChange({ base64, file });
        setBase64(base64);
      };
      reader.readAsDataURL(file);
    }
  }, [setBase64]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout>
      <Label htmlFor={name}>{label}</Label>
      <EPictureInput {...getRootProps()} width={width} height={height}>
        <input {...getInputProps()} />
        {base64 ? (
          <EPicture src={base64} />
        ) : (
          <CameraOutline width={'30px'} height={'30px'} />
        )}
      </EPictureInput>
    </Layout>
  );
}

export default InputFile;
