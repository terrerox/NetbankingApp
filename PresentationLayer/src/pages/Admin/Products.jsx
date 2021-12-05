import React from 'react'
import { useParams } from 'react-router-dom';
import { useClientStore } from '../../store'
import { Text, Flex } from '@chakra-ui/react';
import Loans from '../../components/products/Loans'
import Accounts from '../../components/products/Accounts'
import Cards from '../../components/products/Cards'

const Products = () => {
    const { clientId } = useParams();
    const client = useClientStore(state => state.client)

    return (
        <Flex direction="column" justifyContent="space-around">
            <Text my="2" fontSize="3xl" fontFamily="monospace" fontWeight="bold">
                Productos de {client.name} {client.lastName}
            </Text>
            <Loans clientId={clientId} />
            <hr />
            <Accounts clientId={clientId} />
            <hr />
            <Cards clientId={clientId} />
        </Flex>
    )
}

export default Products
