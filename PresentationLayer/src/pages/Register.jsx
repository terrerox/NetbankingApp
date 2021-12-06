import React, { useState } from 'react'
import { useUserStore } from '../store'
import { Link as ReachLink } from "react-router-dom";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    SimpleGrid,
    Text,
    Link,
    useToast
} from '@chakra-ui/react';
import IdentityCardInput from '../components/IdentityCardInput'


const Register = () => {
    const [registerCredentials, setRegisterCredentials] = useState({
        username: '',
        password: '',
        email: '',
        identityCard: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('')
    const toast = useToast()
    const register = useUserStore(state => state.register)
    const status = useUserStore(state => state.status)

    const { username, password, email, identityCard } = registerCredentials;
    const updateState = e => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return toast({
                title: "Error",
                description: "Contraseñas no coinciden",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        await register(registerCredentials)
        setRegisterCredentials({
            username: '',
            password: '',
            email: '',
            identityCard: ''
        })
        setConfirmPassword('')
        return toast({
            title: "Te has registrado correctamente",
            description: "Puedes ir a loguearte",
            status: "success",
            duration: 9000,
            isClosable: true,
        })
    }
    return (
        <Flex mt="8%" align="center" justifyContent="center">
            <Box p={10} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading>Registrar</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Usuario</FormLabel>
                            <Input
                                isRequired
                                name="username"
                                onChange={updateState}
                                value={username}
                                placeholder="Ingrese el nombre de usuario"
                            />
                            <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                                <FormControl>
                                    <FormLabel>Contraseña</FormLabel>
                                    <Input
                                        isRequired
                                        name="password"
                                        onChange={updateState}
                                        type="password"
                                        value={password}
                                        placeholder="Ingrese la contraseña"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Confirmar Contraseña</FormLabel>
                                    <Input
                                        isRequired
                                        type="password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                        placeholder="Confirmar contraseña"
                                    />
                                </FormControl>
                            </SimpleGrid>


                            <FormLabel>Email</FormLabel>
                            <Input
                                isRequired
                                name="email"
                                onChange={updateState}
                                value={email}
                                placeholder="Ingrese el email"
                            />
                            <FormLabel>Cédula</FormLabel>
                            <IdentityCardInput
                                isRequired
                                name="identityCard"
                                onChange={updateState}
                                value={identityCard}
                                placeholder="Ingrese la cedula"
                            />
                        </FormControl>
                        <Button 
                            isLoading={status.registering}
                            type="submit" 
                            colorScheme='teal' 
                            variant='outline' 
                            width="full" 
                            mt={4}
                        >
                            Enviar
                        </Button>

                        <Text align="center"  mt="2px">
                            ¿Ya tienes una cuenta?                             
                            <Link as={ReachLink} ml="2px" color='teal' to="/">
                                Inicia sesión aquí
                            </Link>
                        </Text>
                    </form>
                </Box>
            </Box>
        </Flex>
    )
}

export default Register
