import React, { useEffect } from 'react'
import { useAccountStore } from '../../store'
import { Text, Flex, Button, useDisclosure } from "@chakra-ui/react";
import AccountsTable from '../tables/AccountsTable'
import AccountModal from '../modals/AccountModal'


const Accounts = ({ clientId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getAccounts = useAccountStore(state => state.getAccounts)
    const setAccount = useAccountStore(state => state.setAccount)
    useEffect(() => {
        getAccounts(clientId)
    }, [])

    const addAccount = () => {
      onOpen()
      setAccount({})
    }

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between">
                <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Cuentas
                </Text>
                <Button colorScheme='teal' variant='outline' onClick={addAccount}>
                    Nuevo
                </Button>
            </Flex>
            <AccountModal 
                isOpen={isOpen}
                onClose={onClose}
            />
            <AccountsTable 
                onOpen={onOpen}
            />
        </>
    )
}

export default Accounts
