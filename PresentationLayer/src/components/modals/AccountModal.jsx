import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast
} from '@chakra-ui/react'
import { useAccountStore } from '../../store'
import AccountForm from '../forms/AccountForm'

const AccountModal = ({ isOpen, onClose }) => {

    const selectedAccount = useAccountStore(state => state.account)
    const [account, setAccount] = useState({
        number: '',
        balance: 0,
        clientId: ''
    });
    const toast = useToast()
    const addAccount = useAccountStore(state => state.addAccount)
    const updateAccount = useAccountStore(state => state.updateAccount)
    const status = useAccountStore(state => state.status)

    const { number, balance, clientId } = account
    const intBalance = Number(balance)
    const handleSubmit = async e => {
        e.preventDefault()
        if (number === 0 || balance === 0) {
            return toast({
                title: "Error",
                description: "Favor completar todos los campos",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        selectedAccount.id
            ? (
                updateAccount({
                    id: selectedAccount.id,
                    ...account
                })
                    .then(
                        toast({
                            title: "Actualizado",
                            description: "¡Cuenta actualizada correctamente!",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                    )
            )
            : (
                addAccount({ 
                    number, 
                    balance: intBalance,
                    clientId
                })
                    .then(() => {
                        onClose()
                        return toast({
                            title: "Agregado",
                            description: "¡Cuenta agregada correctamente!",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                    )
            )
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {
                        selectedAccount.id
                            ? 'Actualizar Cuenta'
                            : 'Agregar Cuenta'
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <AccountForm
                        account={account}
                        setAccount={setAccount}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Cerrar
                    </Button>
                    <Button
                        isLoading={status.isLoading}
                        onClick={handleSubmit}
                        colorScheme='teal'
                    >
                        {selectedAccount.id ? 'Actualizar' : 'Agregar'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AccountModal
