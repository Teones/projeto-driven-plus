import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

import "./styles.css"

export default function Planos ({dados}) {
    return (
        <div className="planos">
            <Header />
            <Opcoes dados={dados} />
        </div>
    )
}

function Header () {
    return (
        <div className="header">
            Escolha seu Plano
        </div>
    )
}

function Opcoes ({dados}) {
    const [planos, setPlanos] = useState([])

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships"
        const config = {
            headers: {
                "Authorization": `Bearer ${dados}`
            }
        }
        const promise = axios.get(url, config)
        promise.then(response => {
            const {data} = response
            setPlanos(data)
        })
        promise.catch(erro => alert(erro.response.data.message))
    }, [])

    return (
        <div className="opcoes">
            {planos.map(plano => <Plano imagem={plano.image} valor={plano.price} id={plano.id} />)}
        </div>
    )
}

function Plano ({imagem, valor, id}) {
    const link = `/subscriptions/${id}`
    return (
        <Link to={link}>
            <div className="plano">
                <img src={imagem} alt="logo do plano"/>
                R$ {valor}
            </div>
        </Link>
    )
}