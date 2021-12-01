import React, { useState } from 'react'
import { useUserStore } from '../store'

const Login = () => {  
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const login = useUserStore(state => state.login)

    const { username, password } = user;
    const updateState = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = async e => {
      e.preventDefault()
        try {
            login(user)
        } catch (error) {
            console.log(error.response)
        }
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
            <button type="submit">Inicia sesión</button>
        </form>
    )
}

export default Login
