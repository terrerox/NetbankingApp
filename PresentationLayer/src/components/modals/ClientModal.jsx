import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast
} from '@chakra-ui/react'
import { useClientStore } from '../../store'
import { useUserStore } from '../../store'
import ClientForm from '../forms/ClientForm'
import clientService from '../../services/clientService'


const ClientModal = ({ isOpen, onClose }) => {

    const selectedClient = useClientStore(state => state.client)
    const user = useUserStore(state => state.user)
    const setLoggedClient = useUserStore(state => state.setLoggedClient)
    const navigate = useNavigate()
    const [client, setClient] = useState({
        identityCard: '',
        name: '',
        lastName: '',
        phoneNumber: '',
        userId: ''
    });
    const toast = useToast()
    const addClient = useClientStore(state => state.addClient)
    const updateClient = useClientStore(state => state.updateClient)
    const status = useClientStore(state => state.status)

    const isEmpty = obj => !Object.values(obj).every(element => element !== '')

    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(client)) {
            return toast({
                title: "Error",
                description: "Favor completar todos los campos",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        selectedClient.id
            ? (
                updateClient({
                    id: selectedClient.id,
                    ...client
                })
                    .then(
                        toast({
                            title: "Actualizado",
                            description: "¡Cliente actualizado correctamente!",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                    )
            )
            : (
                addClient(client)
                    .then(async () => {
                        toast({
                            title: "Agregado",
                            description: "¡Cliente agregado correctamente!",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                        if(user.role === 0) {
                            const client = await clientService.getByUserId(user.id)
                            console.log(client)
                            setLoggedClient(client)
                            return navigate('/client/accounts')
                        }
                        return onClose()
                    }
                    )
            )
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {
                        selectedClient.id
                            ? 'Actualizar Cliente'
                            : 'Agregar Cliente'
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ClientForm
                        client={client}
                        setClient={setClient}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Cerrar
                    </Button>
                    <Button
                        isLoading={status.isLoading}
                        onClick={handleSubmit}
                        colorScheme='teal'
                    >
                        {selectedClient.id ? 'Actualizar' : 'Agregar'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ClientModal
