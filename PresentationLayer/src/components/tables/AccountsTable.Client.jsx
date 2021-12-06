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
import { useUserStore, useAccountStore } from '../../store'

const AccountsTable = () => {
    const loggedClient = useUserStore(state => state.loggedClient)
    const setAccount = useAccountStore(state => state.setAccount)
    const navigate = useNavigate()

    const { accounts } = loggedClient.data

    const goToHistory = (account) => {
        setAccount(account)
        navigate(account.id)
    }
    return (
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>
                Esto son todas las cuentas registradas hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Tipo</Th>
                    <Th>Número</Th>
                    <Th>Balance</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    accounts.map(account => (
                        <Tr key={account.id}>
                            <Td>Ahorro</Td>
                            <Td>{account.number}</Td>
                            <Td>{account.balance}</Td>
                            <Td>
                                <Button
                                    leftIcon={<FiClock />}
                                    colorScheme='blue'
                                    variant='solid'
                                    onClick={() => goToHistory(account)}
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
                    <Th>Número</Th>
                    <Th>Balance</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default AccountsTable
