import React from 'react';
import InputMask from 'react-input-mask';
import { Input } from '@chakra-ui/react';
import { useAccountStore } from '../store'

const AccountNumberInput = (props) => {
  const selectedAccount = useAccountStore(state => state.account)

  return (
    <InputMask
      mask="999-999999-9"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      {(inputProps) => <Input {...inputProps} type="text" isDisabled={selectedAccount.id} />}
    </InputMask>
  )
};

export default AccountNumberInput