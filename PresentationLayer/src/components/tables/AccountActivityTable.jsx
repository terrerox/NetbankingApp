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
import { useAccountStore } from '../../store'

const AccountActivityTable = () => {
    const account = useAccountStore(state => state.account)

    const { accountActivities } = account
    return (
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>
                Esto es todo el historial registrado hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Monto</Th>
                    <Th>Tipo</Th>
                    <Th>Fecha</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    accountActivities.map(accountActivity => (
                        <Tr key={accountActivity.id}>
                            <Td
                                color={accountActivity.type ? 'green' : 'red'}
                            >
                                {accountActivity.type ? '+' : '-'}{accountActivity.amount}
                            </Td>
                            <Td>{accountActivity.type ? 'Depósito' : 'Retiro'}</Td>
                            <Td>{accountActivity.date}</Td>
                        </Tr>
                    ))
                }
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>Monto</Th>
                    <Th>Tipo</Th>
                    <Th>Fecha</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default AccountActivityTable
