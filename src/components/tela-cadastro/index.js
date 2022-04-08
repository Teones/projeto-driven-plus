import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

import "./styles.css"

export default function Cadastro () {
    return (
        <div className="cadastro">
            <Formulario />
            <Login />
        </div>
    )
}

function Formulario () {
    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate()

    function cadastrar(event) {
        event.preventDefault()
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up"
        const body = {
            email: email,
            name: nome,
            cpf: cpf,
            password: senha,
        }
        const promise = axios.post(url, body)
        promise.then( response => {
            const {data} = response
            navigate("/")
        })
        promise.catch(erro => alert(erro.response.data.message))
    }

    return (
        <form onSubmit={cadastrar}>
            <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
            <input type="number" placeholder="CPF" value={cpf} onChange={e => setCPF(e.target.value)} required />
            <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />

            <button type="submit">CADASTRAR</button>
        </form>
    )
}

function Login () {
    return (
        <div className="link">
            <Link to="/">Já possuí uma conta? Entre</Link>
        </div>
    )
}