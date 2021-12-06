import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useUserStore, useAccountStore } from '../../store'

import AccountsTable from '../../components/tables/AccountsTable.Client'



const Accounts = () => {
    const loggedClient = useUserStore(state => state.loggedClient)
    const getAccounts = useAccountStore(state => state.getAccounts)
    

    useEffect(() => {
        getAccounts(loggedClient.data.id)
    }, [])
    return (
        <>
            <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Cuentas
            </Text>
            <AccountsTable />
        </>
    )
}

export default Accounts
