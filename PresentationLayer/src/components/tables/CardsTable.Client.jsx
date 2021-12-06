import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Flex,
    useToast
} from '@chakra-ui/react'
import {
    FiPenTool,
    FiClock
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { useUserStore, useCardStore } from '../../store'

const CardsTable = () => {
    const cards = useCardStore(state => state.cards)
    const setCard = useCardStore(state => state.setCard)
    const navigate = useNavigate()

    const goToHistory = (card) => {
        setCard(card)
        navigate(card.id)
    }
    return (
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>
                Esto son todas las tarjetas registradas hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Tipo</Th>
                    <Th>Monto</Th>
                    <Th>Balance</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    cards.map(card => (
                        <Tr key={card.id}>
                            <Td>Débito</Td>
                            <Td>{card.amount}</Td>
                            <Td>{card.balance}</Td>
                            <Td>
                                <Button
                                    leftIcon={<FiClock />}
                                    colorScheme='blue'
                                    variant='solid'
                                    onClick={() => goToHistory(card)}
                                >
                                    Ver movimientos
                                </Button>
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>Tipo</Th>
                    <Th>Monto</Th>
                    <Th>Balance</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default CardsTable
