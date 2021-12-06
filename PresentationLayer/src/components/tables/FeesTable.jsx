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
import { useLoanStore } from '../../store'

const FeesTable = () => {
    const loan = useLoanStore(state => state.loan)

    const { fees } = loan
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
                    fees.map(fee => (
                        <Tr key={fee.id}>
                            <Td color="red">-{fee.amount}</Td>
                            <Td>{fee.date}</Td>
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

export default FeesTable
