import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios"

import "./styles.css"

export default function Plano ({dados}) {
    const { id } = useParams();
    const [planos, setPlanos] = useState([])

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`
        const config = {
            headers: {
                "Authorization": `Bearer ${dados}`
            }
        }
        const promise = axios.get(url, config)
        promise.then(response => {
            const {data} = response
            setPlanos(data)
            console.log(data)
        })
        promise.catch(erro => console.log(erro.response))
    }, [])


    return (
        <div className="plano">
            <Logo imagem={planos.image} nome={planos.name} />
            <DadosDoPlano beneficios={planos.perks} valor={planos.price} />
            <Formulario />
        </div>
    )
}

function Logo ({nome, imagem}) {
    return (
        <div className="logo">
            <img src={imagem} alt={nome} />
            {nome}
        </div>
    )
}

function DadosDoPlano ({beneficios, valor}) {
    return (
        <div className="dados-do-plano">
            <h1>Beneficios:</h1>
            {beneficios.map(beneficio => <Beneficio id={beneficio.id} titulo={beneficio.title} />)}
            <h2>Preço:</h2>
            R$ {valor} cobrados mensalmente
        </div>
    )
}
function Beneficio ({id, titulo}) {
    return (
        <div className="beneficio">
            {id - 5}. {titulo}
        </div>
    )
}

function Formulario () {
    const [nome, setNome] = useState("")
    const [numero, setNumero] = useState("")
    const [codigo, setCodigo] = useState("")
    const [validade, setValidade] = useState("")

    const navigate = useNavigate()

    function assinar(event) {
        event.preventDefault()
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
        const body = {
            membershipId: 1,
            cardName: nome,
            cardNumber: numero,
            securityNumber: codigo,
            expirationDate: validade
        }
        const promise = axios.post(url, body)
        promise.then(response => {
            const {data} = response
            // setDados(data)
            {data.menbership === undefined ? 
                navigate("/subscriptions") : navigate("/")}
            
        })
        promise.catch(erro => alert(erro.response))
    }


    return (
        <form onSubmit={assinar}>
            <input type="text" placeholder="Nome impresso no cartão" value={nome} onChange={e => setNome(e.target.value)} required />
            <input type="number" placeholder="Digitos do cartão" value={numero} onChange={e => setNumero(e.target.value)} required />
            <input type="number" placeholder="Cógigo de segurança" value={codigo} onChange={e => setCodigo(e.target.value)} required />
            <input type="number" placeholder="Validade" value={validade} onChange={e => setValidade(e.target.value)} required />

            <button type="submit">ASSINAR</button>
        </form>
    )   
}