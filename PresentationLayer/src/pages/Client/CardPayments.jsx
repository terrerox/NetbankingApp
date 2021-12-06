import React from 'react'
import { Text } from "@chakra-ui/react";
import CardPaymentTable from '../../components/tables/CardPaymentTable'

const CardPayments = () => {
    return (
        <>
            <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Movimientos de tarjeta
            </Text>
            <CardPaymentTable />
        </>
    )
}

export default CardPayments
