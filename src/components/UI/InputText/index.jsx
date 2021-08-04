// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Container,
  Label,
  Input
} from './styles';

function InputText({ name, label, placeholder, type = 'text' }) {
  return (
    <Layout>
      <Label for={name}>{label}</Label>
      <Container>
        <Input type={type} placeholder={placeholder} />
      </Container>
    </Layout>
  );
}

export default InputText;
