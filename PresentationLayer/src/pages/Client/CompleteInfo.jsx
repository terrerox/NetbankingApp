import { useEffect } from 'react'
import { useUserStore } from '../../store'
import { useDisclosure, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import ClientModal from '../../components/modals/ClientModal'


const Accounts = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const loggedClient = useUserStore(state => state.loggedClient)
    const isAlreadyRegistered = () => loggedClient.success ? navigate('/client/accounts') : onOpen()

    useEffect(() => {
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
