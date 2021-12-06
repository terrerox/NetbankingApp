import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useUserStore, useLoanStore } from '../../store'
import clientService from '../../services/clientService'
import LoansTable from '../../components/tables/LoansTable.Client'

const Loans = () => {
    const loggedClient = useUserStore(state => state.loggedClient)
    const getLoans = useLoanStore(state => state.getLoans)
    

    useEffect(() => {
        getLoans(loggedClient.data.id)
    }, [])
    return (
        <>
            <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Prestamos
            </Text>
            <LoansTable />
        </>
    )
}

export default Loans
