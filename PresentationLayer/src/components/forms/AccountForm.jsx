import React, { useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import { useAccountStore } from '../../store'
import { useParams } from 'react-router-dom';
import { randomAccountNumber } from '../../helpers'
import AccountNumberInput from '../../components/AccountNumberInput'

const AccountForm = ({ account, setAccount }) => {
    const { clientId } = useParams()
    const selectedAccount = useAccountStore(state => state.account)
    
    useEffect(() => {
        setAccount({
            number: selectedAccount.number || '',
            balance: selectedAccount.balance || 0,
            clientId: selectedAccount.clientId || clientId
        })
    }, [])
    const { number, balance } = account;

    const updateState = e => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form>
            <FormControl>
                <FormLabel>Número de cuenta</FormLabel>
                <AccountNumberInput
                    isDisabled={selectedAccount.number}
                    name="number"
                    onChange={updateState}
                    value={number}
                    placeholder="Ingrese el monto"
                />
                <FormLabel>Balance</FormLabel>
                <Input
                    isRequired
                    name="balance"
                    type="number"
                    onChange={updateState}
                    value={balance}
                    placeholder="Ingrese el balance"
                />
            </FormControl>
        </form>
    )
}

export default AccountForm
