import React, { useEffect } from 'react'
import { useCardStore } from '../../store'
import { Text, Flex, Button, useDisclosure } from "@chakra-ui/react";
import CardsTable from '../tables/CardsTable'
import CardModal from '../modals/CardModal'


const Cards = ({ clientId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getCards = useCardStore(state => state.getCards)
    const setCard = useCardStore(state => state.setCard)
    useEffect(() => {
        getCards(clientId)
    }, [])

    const addCard = () => {
      onOpen()
      setCard({})
    }

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between">
                <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Tarjetas
                </Text>
                <Button colorScheme='teal' variant='outline' onClick={addCard}>
                    Nuevo
                </Button>
            </Flex>
            <CardModal 
                isOpen={isOpen}
                onClose={onClose}
            />
            <CardsTable 
                onOpen={onOpen}
            />
        </>
    )
}

export default Cards
