import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useUserStore, useCardStore } from '../../store'
import CardsTable from '../../components/tables/CardsTable.Client'

const Cards = () => {
    const loggedClient = useUserStore(state => state.loggedClient)
    const getCards = useCardStore(state => state.getCards)
    

    useEffect(() => {
        getCards(loggedClient.data.id)
    }, [])
    return (
        <>
            <Text my="2" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Tarjetas
            </Text>
            <CardsTable />
        </>
    )
}

export default Cards
