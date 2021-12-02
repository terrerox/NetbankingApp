import React from 'react';
import InputMask from 'react-input-mask';
import { Input } from '@chakra-ui/react';
 
const IdentityCardInput = (props) => (
  <InputMask 
    mask="999-9999999-9"            
    name={props.name} 
    value={props.value} 
    onChange={props.onChange}
  >
    {(inputProps) => <Input {...inputProps} type="text" />}
  </InputMask>
);

export default IdentityCardInput