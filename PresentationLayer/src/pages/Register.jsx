import React, { useState } from 'react'
import { useUserStore } from '../store'


const Register = () => {
    const [registerCredentials, setRegisterCredentials] = useState({
        username: '',
        password: '',
        email: '',
        identityCard: ''
    });
    const register = useUserStore(state => state.register)

    const { username, password, email, identityCard } = registerCredentials;
    const updateState = e => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = async e => {
      e.preventDefault()
      register(registerCredentials)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="username"                
                onChange={updateState} 
                value={username}
                placeholder="Ingrese el nombre de usuario" 
            />
            <input 
                name="password"                
                onChange={updateState} 
                value={password}
                placeholder="Ingrese la contraseña" 
            />
            <input 
                name="email"                
                onChange={updateState} 
                value={email}
                placeholder="Ingrese el email" 
            />
            <input 
                name="identityCard"                
                onChange={updateState} 
                value={identityCard}
                placeholder="Ingrese la cedula" 
            />
            <button type="submit">Inicia sesión</button>
        </form>
    )
}

export default Register
