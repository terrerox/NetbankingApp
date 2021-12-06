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
import { useAccountStore } from '../../store'
import { useUserStore } from '../../store'

const AccountsTable = ({ onOpen }) => {
    const accounts = useAccountStore(state => state.accounts)
    const user = useUserStore(state => state.user)
    const setAccount = useAccountStore(state => state.setAccount)
    const deleteAccountAction = useAccountStore(state => state.deleteAccount)
    const toast = useToast()

    const updateAccount = (account) => {
        setAccount(account)
        onOpen()
    }

    const deleteAccount = (id) => {
        deleteAccountAction(id)
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
                Esto son todas las cuentas registradas hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Tipo</Th>
                    <Th>Número</Th>
                    <Th>Balance</Th>
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
                                <Flex alignItems="center" justifyContent="space-around">
                                    <Button
                                        leftIcon={<FiPenTool />}
                                        colorScheme='blue'
                                        variant='solid'
                                        onClick={() => updateAccount(account)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        leftIcon={<FiDelete />}
                                        colorScheme='red'
                                        variant='solid'
                                        onClick={() => deleteAccount(account.id)}
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
                    <Th>Número</Th>
                    <Th>Balance</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default AccountsTable
