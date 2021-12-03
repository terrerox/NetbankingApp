import React, { useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';
import { useClientStore } from '../../store'
import IdentityCardInput from '../../components/IdentityCardInput'
import PhoneNumberInput from '../../components/PhoneNumberInput'

const ClientForm = ({ client, setClient }) => {
    const selectedClient = useClientStore(state => state.client)
    useEffect(() => {
        setClient({
            identityCard: selectedClient.identityCard || '',
            name: selectedClient.name || '',
            lastName: selectedClient.lastName || '',
            phoneNumber: selectedClient.phoneNumber || ''
        })
    }, [])
    const { identityCard, name, lastName, phoneNumber } = client;

    const updateState = e => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form>
            <FormControl>
                <FormLabel>Cédula</FormLabel>
                <IdentityCardInput
                    isRequired
                    name="identityCard"
                    onChange={updateState}
                    value={identityCard}
                    placeholder="Ingrese la cedula"
                />
                <FormLabel>Nombre</FormLabel>
                <Input
                    isRequired
                    name="name"
                    onChange={updateState}
                    type="text"
                    value={name}
                    placeholder="Ingrese el nombre"
                />
                <FormLabel>Apellido</FormLabel>
                <Input
                    isRequired
                    name="lastName"
                    onChange={updateState}
                    value={lastName}
                    placeholder="Ingrese el apellido"
                />
                <FormLabel>Teléfono</FormLabel>
                <PhoneNumberInput
                    isRequired
                    name="phoneNumber"
                    onChange={updateState}
                    value={phoneNumber}
                    placeholder="Ingrese el numero"
                />
            </FormControl>
        </form>
    )
}

export default ClientForm
