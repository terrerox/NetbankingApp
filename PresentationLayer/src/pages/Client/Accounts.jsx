import { Text } from "@chakra-ui/react";

import AccountsTable from '../../components/tables/AccountsTable.Client'



const Accounts = () => {
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
