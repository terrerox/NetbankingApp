import React from 'react'

import InputMask from 'react-input-mask';
import { Input } from '@chakra-ui/react';
 
const PhoneNumberInput = (props) => (
  <InputMask 
    mask="999-999-9999"            
    name={props.name} 
    value={props.value} 
    onChange={props.onChange}
  >
    {(inputProps) => <Input {...inputProps} type="text" />}
  </InputMask>
);

export default PhoneNumberInput
