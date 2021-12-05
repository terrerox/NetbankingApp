import React, { useEffect, useState } from 'react'
import { useClientStore } from '../../store'
import { FiSearch } from "react-icons/fi";
import { 
    Text, 
    Flex, 
    Button, 
    Input, 
    InputGroup,
    InputLeftElement,
    useDisclosure
} from "@chakra-ui/react";
import ClientsTable from '../../components/tables/ClientsTable'
import ClientModal from '../../components/modals/ClientModal'


const Admin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getClients = useClientStore(state => state.getClients)
    const setClients = useClientStore(state => state.setClients)
    const setClient = useClientStore(state => state.setClient)
    const clients = useClientStore(state => state.clients)
    const [allClients, setAllClients] = useState([])
    useEffect(() => {
        const getAllClients = async() => {
            const clients = await getClients()
            setAllClients(clients)
        } 
        getAllClients()
    }, [])

    const addClient = () => {
        onOpen()
        setClient({})
    }
    const findByIdentityCard = (value) => {
        if ( value.trim() === '') return setClients(allClients)

        const result = clients.filter(client => {
            return client.identityCard.toLowerCase().trim().includes(value.toLowerCase().trim())
        })
        setClients(result)
    }
    return (
        <>
            <Flex alignItems="center" justifyContent="space-between">
                <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Clientes
                </Text>
                <InputGroup w="40%">
                    <InputLeftElement
                        pointerEvents='none'
                        children={<FiSearch color='gray.300' />}
                    />
                    <Input 
                        placeholder="Buscar por cédula"
                        type="text"
                        onChange={e => findByIdentityCard(e.target.value)}
                    />
                </InputGroup>
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
