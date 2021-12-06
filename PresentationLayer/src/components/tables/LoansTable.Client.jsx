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
import { useUserStore, useLoanStore } from '../../store'

const LoansTable = () => {
    const loans = useLoanStore(state => state.loans)
    const setLoan = useLoanStore(state => state.setLoan)
    const navigate = useNavigate()


    const goToHistory = (loan) => {
        setLoan(loan)
        navigate(loan.id)
    }
    return (
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>
                Esto son todas las cuentas registradas hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Monto</Th>
                    <Th>Motivo</Th>
                    <Th>Cantidad de cuotas</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    loans.map(loan => (
                        <Tr key={loan.id}>
                            <Td>{loan.amount}</Td>
                            <Td>{loan.description}</Td>
                            <Td>{loan.amountOfFees}</Td>
                            <Td>
                                <Button
                                    leftIcon={<FiClock />}
                                    colorScheme='blue'
                                    variant='solid'
                                    onClick={() => goToHistory(loan)}
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
                    <Th>Monto</Th>
                    <Th>Motivo</Th>
                    <Th>Cantidad de cuotas</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default LoansTable
