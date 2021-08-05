// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Container,
  Label,
  Input
} from './styles';

function InputText({
  name,
  label,
  value,
  placeholder,
  type = 'text',
  onChange = () => {}
}) {
  return (
    <Layout>
      <Label htmlFor={name}>{label}</Label>
      <Container>
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
      </Container>
    </Layout>
  );
}

export default InputText;
