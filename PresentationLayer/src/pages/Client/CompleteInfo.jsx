import { useEffect } from 'react'
import { useUserStore, useClientStore } from '../../store'
import { useDisclosure, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import ClientModal from '../../components/modals/ClientModal'


const Accounts = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const loggedClient = useUserStore(state => state.loggedClient)
    const setClient = useClientStore(state => state.setClient)
    const isAlreadyRegistered = () => loggedClient.success ? navigate('/client/accounts') : onOpen()

    useEffect(() => {
        setClient({})
        isAlreadyRegistered()
    }, [])

    return (
            <ClientModal
                isOpen={isOpen}
                onClose={onClose}
            />
    )
}

export default Accounts
