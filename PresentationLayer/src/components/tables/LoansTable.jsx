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
import { useLoanStore } from '../../store'

const LoansTable = ({ onOpen }) => {
    const loans = useLoanStore(state => state.loans)
    const setLoan = useLoanStore(state => state.setLoan)
    const deleteLoanAction = useLoanStore(state => state.deleteLoan)
    const toast = useToast()

    const updateLoan = (loan) => {
        setLoan(loan)
        onOpen()
    }

    const deleteLoan = (id) => {
        deleteLoanAction(id)
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
                Esto son todos los prestamos registrados hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Monto</Th>
                    <Th>Motivo</Th>
                    <Th>Cantidad de cuotas</Th>
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
                                <Flex alignItems="center" justifyContent="space-around">
                                    <Button
                                        leftIcon={<FiPenTool />}
                                        colorScheme='blue'
                                        variant='solid'
                                        onClick={() => updateLoan(loan)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        leftIcon={<FiDelete />}
                                        colorScheme='red'
                                        variant='solid'
                                        onClick={() => deleteLoan(loan.id)}
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
                    <Th>Monto</Th>
                    <Th>Motivo</Th>
                    <Th>Cantidad de cuotas</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default LoansTable
