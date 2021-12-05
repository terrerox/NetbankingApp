import React from 'react'
import { useNavigate } from "react-router-dom";
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
import { useClientStore } from '../../store'

const ClientsTable = ({ onOpen }) => {
    const setClient = useClientStore(state => state.setClient)
    const clients = useClientStore(state => state.clients)
    const deleteClientAction = useClientStore(state => state.deleteClient)
    const toast = useToast()
    const navigate = useNavigate()

    const goToProducts = (client) => {
        setClient(client)
        navigate(client.id)
    }

    const updateClient = (client) => {
        setClient(client)
        onOpen()
    }

    const deleteClient = (id) => {
        deleteClientAction(id)
            .then(
                toast({
                    title: "Eliminado",
                    description: "Cliente eliminado con éxito",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            )
    }
    return (
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>
                Esto son todos los clientes registrados hasta el momento
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Productos</Th>
                    <Th>Cédula</Th>
                    <Th>Nombre</Th>
                    <Th>Apellido</Th>
                    <Th>Teléfono</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    clients.map(client => (
                        <Tr key={client.id}>
                            <Td>
                                <Button 
                                    colorScheme='teal' 
                                    variant='solid' 
                                    onClick={() => goToProducts(client)}
                                >
                                    Productos
                                </Button>
                            </Td>
                            <Td>{client.identityCard}</Td>
                            <Td>{client.name}</Td>
                            <Td>{client.lastName}</Td>
                            <Td>{client.phoneNumber}</Td>
                            <Td>
                                <Flex alignItems="center" justifyContent="space-around">
                                    <Button
                                        leftIcon={<FiPenTool />}
                                        colorScheme='blue'
                                        variant='solid'
                                        onClick={() => updateClient(client)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        leftIcon={<FiDelete />}
                                        colorScheme='red'
                                        variant='solid'
                                        onClick={() => deleteClient(client.id)}
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
                    <Th>Productos</Th>
                    <Th>Cédula</Th>
                    <Th>Nombre</Th>
                    <Th>Apellido</Th>
                    <Th>Teléfono</Th>
                    <Th>Acciones</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default ClientsTable
