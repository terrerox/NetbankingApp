import React from 'react'
import { useParams } from 'react-router-dom';

import Loans from '../../components/products/Loans'
import Accounts from '../../components/products/Accounts'
import Cards from '../../components/products/Cards'

const Products = () => {
    const { clientId } = useParams();

    return (
        <>
            <Loans clientId={clientId} />
            <Accounts clientId={clientId} />
            <Cards clientId={clientId} />
        </>
    )
}

export default Products
