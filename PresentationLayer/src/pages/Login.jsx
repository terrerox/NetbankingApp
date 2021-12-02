import React, { useState } from 'react'
import { useUserStore } from '../store'
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    Text,
    useToast
} from '@chakra-ui/react';

const Login = () => {
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate()
    const login = useUserStore(state => state.login)
    const status = useUserStore(state => state.status)

    const { username, password } = userCredentials;
    const updateState = e => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const user = await login(userCredentials)
        user.role 
            ? navigate("/admin/clients", { replace: true })
            : navigate("/client", { replace: true });
    }
    return (
        <Flex mt="10%" align="center" justifyContent="center">
            <Box p={10} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading>Iniciar Sesión</Heading>
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
                            <FormLabel>Contraseña</FormLabel>
                            <Input
                                isRequired
                                type="password"
                                name="password"
                                onChange={updateState}
                                value={password}
                                placeholder="Ingrese la contraseña"
                            />
                        </FormControl>
                        <Button 
                            isLoading={status.loggingIn}
                            type="submit" 
                            colorScheme='teal' 
                            variant='outline' 
                            width="full" 
                            mt={4}
                        >
                            Enviar
                        </Button>
                        <Text align="center"  mt="2px">
                            ¿No te has registrado?                             
                            <Link as={ReachLink} ml="2px" color='teal' to="/register">
                                Registrate aquí
                            </Link>
                        </Text>
                    </form>
                </Box>
            </Box>
        </Flex>
    )
}

export default Login
