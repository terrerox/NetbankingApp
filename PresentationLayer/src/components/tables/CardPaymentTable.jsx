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
} from '@chakra-ui/react'
import { useCardStore } from '../../store'

const CardPaymentTable = () => {
    const card = useCardStore(state => state.card)

    const { cardPayments } = card
    return (
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>
                Esto es todo el historial registrado hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Monto</Th>
                    <Th>Fecha</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    cardPayments.map(cardPayment => (
                        <Tr key={cardPayment.id}>
                            <Td color="green">+{cardPayment.amount}</Td>
                            <Td>{cardPayment.date}</Td>
                        </Tr>
                    ))
                }
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>Monto</Th>
                    <Th>Fecha</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default CardPaymentTable
