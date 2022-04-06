import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import logo from "../../assepts/driven-pagina-inicial.png"

import "./styles.css"

export default function Login ({setDados}) {
    return(
        <div className="login">
            <Logo />
            <Formulario setDados={setDados} />
            <Cadastro />
        </div>
    )
}

function Logo () {
    return (
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
    )
}

function Formulario ({setDados}) {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate()

    function logar(event) {
        event.preventDefault()
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login"
        const body = {
            email: email,
            password: senha,
        }
        const promise = axios.post(url, body)
        promise.then(response => {
            const {data} = response
            setDados(data)
            {data.menbership === undefined ? 
                navigate("/subscriptions") : navigate("/")}
            
        })
        promise.catch(erro => alert(erro.response))
    }

    return (
        <form onSubmit={logar}>
            <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />

            <button type="submit">ENTRAR</button>
        </form>
    )
}

function Cadastro () {
    return (
        <div className="link">
            <Link to="/sign-up">Não possuí uma conta? Cadastre-se</Link>
        </div>
    )
}