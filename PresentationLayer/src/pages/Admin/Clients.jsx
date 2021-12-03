import React, { useEffect } from 'react'
import { useClientStore } from '../../store'
import { Text, Flex, Button, useDisclosure } from "@chakra-ui/react";
import ClientsTable from '../../components/tables/ClientsTable'
import ClientModal from '../../components/modals/ClientModal'


const Admin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getClients = useClientStore(state => state.getClients)
    const setClient = useClientStore(state => state.setClient)
    useEffect(() => {
        getClients()
    }, [])

    const addClient = () => {
      onOpen()
      setClient({})
    }

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between">
                <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Clientes
                </Text>
                <Button colorScheme='teal' variant='outline' onClick={addClient}>
                    Nuevo
                </Button>
            </Flex>
            <ClientModal 
                isOpen={isOpen}
                onClose={onClose}
            />
            <ClientsTable 
                onOpen={onOpen}
            />
        </>
    )
}

export default Admin
