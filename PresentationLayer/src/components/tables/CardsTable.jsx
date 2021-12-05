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
    FiDelete
} from "react-icons/fi";
import { useCardStore } from '../../store'

const CardsTable = ({ onOpen }) => {
    const cards = useCardStore(state => state.cards)
    const setCard = useCardStore(state => state.setCard)
    const deleteCardAction = useCardStore(state => state.deleteCard)
    const toast = useToast()

    const updateCard = (card) => {
        setCard(card)
        onOpen()
    }

    const deleteCard = (id) => {
        deleteCardAction(id)
            .then(
                toast({
                    title: "Eliminado",
                    description: "Prestamo eliminado con éxito",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            )
    }
    return (
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>
                Esto son todos las tarjetas registradas hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Tipo</Th>
                    <Th>Monto</Th>
                    <Th>Balance</Th>
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
                                <Flex alignItems="center" justifyContent="space-around">
                                    <Button
                                        leftIcon={<FiPenTool />}
                                        colorScheme='blue'
                                        variant='solid'
                                        onClick={() => updateCard(card)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        leftIcon={<FiDelete />}
                                        colorScheme='red'
                                        variant='solid'
                                        onClick={() => deleteCard(card.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Flex>
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
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default CardsTable
