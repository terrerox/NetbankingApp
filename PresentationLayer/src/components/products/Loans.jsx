import React, { useEffect } from 'react'
import { useLoanStore } from '../../store'
import { Text, Flex, Button, useDisclosure } from "@chakra-ui/react";
import LoansTable from '../tables/LoansTable'
import LoanModal from '../modals/LoanModal'


const Loans = ({ clientId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getLoans = useLoanStore(state => state.getLoans)
    const setLoan = useLoanStore(state => state.setLoan)
    useEffect(() => {
        getLoans(clientId)
    }, [])

    const addLoan = () => {
      onOpen()
      setLoan({})
    }

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between">
                <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Prestamos
                </Text>
                <Button colorScheme='teal' variant='outline' onClick={addLoan}>
                    Nuevo
                </Button>
            </Flex>
            <LoanModal 
                isOpen={isOpen}
                onClose={onClose}
            />
            <LoansTable 
                onOpen={onOpen}
            />
        </>
    )
}

export default Loans
