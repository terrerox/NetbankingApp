import React, { useState, useEffect } from 'react'
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
import { useCardStore } from '../../store'
import CardForm from '../forms/CardForm'

const CardModal = ({ isOpen, onClose }) => {

    const selectedCard = useCardStore(state => state.card)
    const [card, setCard] = useState({
        amount: 0,
        balance: 0,
        clientId: ''
    });
    const toast = useToast()
    const addCard = useCardStore(state => state.addCard)
    const updateCard = useCardStore(state => state.updateCard)
    const status = useCardStore(state => state.status)

    const { amount, balance } = card
    const handleSubmit = async e => {
        e.preventDefault()
        if (amount === 0 || balance === 0) {
            return toast({
                title: "Error",
                description: "Favor completar todos los campos",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        selectedCard.id
            ? (
                updateCard({
                id: selectedCard.id,
                ...card
                })
                .then(
                    toast({
                        title: "Actualizado",
                        description: "¡Tarjeta actualizada correctamente!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                )
              )
            : (
                addCard(card)
                .then(
                    toast({
                        title: "Agregado",
                        description: "¡Tarjeta agregada correctamente!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                )
              )
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {
                        selectedCard.id
                            ? 'Actualizar Tarjeta'
                            : 'Agregar Tarjeta'
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CardForm
                        card={card}
                        setCard={setCard}
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
                        {selectedCard.id ? 'Actualizar' : 'Agregar'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CardModal
