import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios"

import "./styles.css"

export default function Plano ({dados, setDados}) {
    const { id } = useParams();
    const [planos, setPlanos] = useState()
    const [popUp, setPopUp] = useState(false)
    const [enviarDados, setEnviarDados] = useState(false)

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
        })
        promise.catch(erro => alert(erro.response.data.message))
    }, [])

    if(!planos){ return(<></>)}
    return (
        <div className="plano">
            <Setinha />
            <Logo imagem={planos.image} nome={planos.name} />
            <DadosDoPlano planos={planos} valor={planos.price} />
            <Formulario token={dados} setDados={setDados} setPopUp={setPopUp} enviarDados={enviarDados} />
            <Confirmacao setPopUp={setPopUp} popUp={popUp} setEnviarDados={setEnviarDados} />
        </div>
    )
}

function Setinha () {
    const navigate = useNavigate()
    return (
        <div className="icone">
            <ion-icon name="arrow-back-outline"onClick={() => navigate("/subscriptions")}></ion-icon>
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
    return (
        <div className="dados-do-plano">
            <h1><ion-icon name="clipboard-outline"></ion-icon> Beneficios:</h1>
            {planos.perks.map(beneficio => <Beneficio id={beneficio.id} titulo={beneficio.title} />)}
            <h2><ion-icon name="card-outline"></ion-icon> Preço:</h2>
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

function Formulario ({token, setDados, setPopUp, enviarDados}) {
    const {id} = useParams()

    const [nome, setNome] = useState("")
    const [numero, setNumero] = useState("")
    const [codigo, setCodigo] = useState("")
    const [validade, setValidade] = useState("")

    function confirmar (event) {
        event.preventDefault()
        setPopUp(true)
    }

    if(enviarDados === true) {
        assinar()
    }
    const navigate = useNavigate()
    
    function assinar() {
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
            setDados(data)
            navigate(`/home`)
            
        })
        promise.catch(erro => alert(erro.response.data.message))
    }


    return (
        <form onSubmit={confirmar}>
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

function Confirmacao({setPopUp, popUp, setEnviarDados}) {
    return (
        <>
        {popUp === true ? 
            <div className="confirmacao">
                <div className="pop-up">
                    <h1>Tem certeza que deseja assinar o plano Driven Plus (R$ 39,99)?</h1>
                    <div className="botoes">
                        <button className="nao" onClick={() => setPopUp(false)}>Não</button>
                        <button className="sim" onClick={() => setEnviarDados(true)}>Sim</button>
                    </div>
                </div>
            </div>
            : <></>}
        </>
    )
}