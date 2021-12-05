import React, { useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';
import { useLoanStore } from '../../store'
import { useParams } from 'react-router-dom';

const LoanForm = ({ loan, setLoan }) => {
    const { clientId } = useParams()
    const selectedLoan = useLoanStore(state => state.loan)
    
    useEffect(() => {
        setLoan({
            amount: selectedLoan.amount || 0,
            description: selectedLoan.description || '',
            amountOfFees: selectedLoan.amountOfFees || 0,
            clientId: selectedLoan.clientId || clientId
        })
    }, [])
    const { amount, description, amountOfFees } = loan;

    const updateState = e => {
        setLoan({
            ...loan,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form>
            <FormControl>
                <FormLabel>Monto</FormLabel>
                <Input
                    isRequired
                    type="number"
                    name="amount"
                    onChange={updateState}
                    value={amount}
                    placeholder="Ingrese el monto"
                />
                <FormLabel>Motivo</FormLabel>
                <Input
                    isRequired
                    name="description"
                    onChange={updateState}
                    type="text"
                    value={description}
                    placeholder="Ingrese el motivo"
                />
                <FormLabel>Cantidad de cuotas</FormLabel>
                <Input
                    isRequired
                    name="amountOfFees"
                    type="number"
                    onChange={updateState}
                    value={amountOfFees}
                    placeholder="Ingrese el apellido"
                />
            </FormControl>
        </form>
    )
}

export default LoanForm
