import React, { useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';
import { useCardStore } from '../../store'
import { useParams } from 'react-router-dom';

const CardForm = ({ card, setCard }) => {
    const { clientId } = useParams()
    const selectedCard = useCardStore(state => state.card)
    
    useEffect(() => {
        setCard({
            amount: selectedCard.amount || 0,
            balance: selectedCard.balance || 0,
            clientId: selectedCard.clientId || clientId
        })
    }, [])
    const { amount, balance } = card;

    const updateState = e => {
        setCard({
            ...card,
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

export default CardForm
