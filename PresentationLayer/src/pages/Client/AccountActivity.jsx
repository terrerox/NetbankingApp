import React, { useEffect } from 'react'
import { Text } from "@chakra-ui/react";
import AccountActivityTable from '../../components/tables/AccountActivityTable'

const AccountActivity = () => {
    return (
        <>
            <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Movimientos de cuenta
            </Text>
            <AccountActivityTable />

        </>
    )
}

export default AccountActivity
