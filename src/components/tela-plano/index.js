import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios"

import "./styles.css"

export default function Plano ({dados, setDados}) {
    const { id } = useParams();
    const [planos, setPlanos] = useState()

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

    if(!planos){ return(<></>)}
    return (
        <div className="plano">
            <Logo imagem={planos.image} nome={planos.name} />
            <DadosDoPlano planos={planos} valor={planos.price} />
            <Formulario token={dados} setDados={setDados} />
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

function DadosDoPlano ({planos, valor}) {
    console.log(planos)
    return (
        <div className="dados-do-plano">
            <h1>Beneficios:</h1>
            {planos.perks.map(beneficio => <Beneficio id={beneficio.id} titulo={beneficio.title} />)}
            <h2>Preço:</h2>
            R$ {valor} cobrados mensalmente
        </div>
    )
}
function Beneficio ({id, titulo}) {
    let ordinal = 0
    if(id >= 6) {
        ordinal = id - 5
    } else if (id < 3 ) {
        ordinal = id
    } else {
        ordinal = id - 2
    }
    return (
        <div className="beneficio">
            {ordinal}. {titulo}
        </div>
    )
}

function Formulario ({token, setDados}) {
    const {id} = useParams()

    const [nome, setNome] = useState("")
    const [numero, setNumero] = useState("")
    const [codigo, setCodigo] = useState("")
    const [validade, setValidade] = useState("")

    const navigate = useNavigate()

    function assinar(event) {
        event.preventDefault()
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
        const body = {
            membershipId: id,
            cardName: nome,
            cardNumber: numero,
            securityNumber: codigo,
            expirationDate: validade
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.post(url, body, config)
        promise.then(response => {
            const {data} = response
            console.log(data)
            setDados(data)
            navigate(`/home`)
            
        })
        promise.catch(erro => console.log(erro.response))
    }


    return (
        <form onSubmit={assinar}>
            <input type="text" placeholder="Nome impresso no cartão" value={nome} onChange={e => setNome(e.target.value)} required />
            <input type="text" placeholder="Digitos do cartão" value={numero} onChange={e => setNumero(e.target.value)} required />
            <div className="separa">
                <input type="number" placeholder="Cógigo de segurança" value={codigo} onChange={e => setCodigo(e.target.value)} required />
                <input type="text" placeholder="Validade" value={validade} onChange={e => setValidade(e.target.value)} required />
            </div>

            <button type="submit">ASSINAR</button>
        </form>
    )   
}