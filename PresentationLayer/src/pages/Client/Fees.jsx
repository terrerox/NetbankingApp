import React from 'react'
import { Text } from "@chakra-ui/react";
import FeesTable from '../../components/tables/FeesTable'

const Fees = () => {
    return (
        <>
            <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Cuotas del prestamo seleccionado
            </Text>
            <FeesTable />
        </>
    )
}

export default Fees
