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
import { useLoanStore } from '../../store'
import LoanForm from '../forms/LoanForm'

const LoanModal = ({ isOpen, onClose }) => {

    const selectedLoan = useLoanStore(state => state.loan)
    const [loan, setLoan] = useState({
        amount: 0,
        description: '',
        amountOfFees: 0,
        clientId: ''
    });
    const toast = useToast()
    const addLoan = useLoanStore(state => state.addLoan)
    const updateLoan = useLoanStore(state => state.updateLoan)
    const status = useLoanStore(state => state.status)

    const isEmpty = obj => !Object.values(obj).every(element => element !== '')

    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(loan)) {
            return toast({
                title: "Error",
                description: "Favor completar todos los campos",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        selectedLoan.id
            ? (
                updateLoan({
                id: selectedLoan.id,
                ...loan
                })
                .then(
                    toast({
                        title: "Actualizado",
                        description: "¡Prestamo actualizado correctamente!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                )
              )
            : (
                addLoan(loan)
                .then(
                    toast({
                        title: "Agregado",
                        description: "¡Prestamo agregado correctamente!",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                )
              )
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {
                        selectedLoan.id
                            ? 'Actualizar Prestamo'
                            : 'Agregar Prestamo'
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <LoanForm
                        loan={loan}
                        setLoan={setLoan}
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
                        {selectedLoan.id ? 'Actualizar' : 'Agregar'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default LoanModal
