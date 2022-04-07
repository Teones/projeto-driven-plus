import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./styles.css"

export default function Home ({dados}) {
    console.log(dados)
    return (
        <div className="home">
            <Header logo={dados.membership.image} />
            <BoasVindas nome={dados.name} />
            <Beneficios beneficios={dados.membership.perks} />
            <Footer token={dados.token} />
        </div>
    )
}

function Header ({logo}) {
    return (
        <div className="header">
            <img src={logo} />
        </div>
    )
}

function BoasVindas ({nome}) {
    return (
        <div className="boas-vindas">
            Olá, {nome}
        </div>
    )
}

function Beneficios ({beneficios}) {
    return (
        <div className="beneficios">
            {beneficios.map(beneficio => <Beneficio titulo={beneficio.title} link={beneficio.link} />)}
        </div>
    )
}
function Beneficio ({titulo, link}) {
    function acessarBeneficio () {
        window.open(link)
    }
    return (
        <div className="beneficio">
            <button onClick={() => acessarBeneficio() }>{titulo}</button>
        </div>
    )
}

function Footer ({token}) {
    const navigate = useNavigate()

    function alterar () {
        navigate("/subscriptions")
    }
    function cancelar() {
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.delete(url, config)
        promise.then(response => {
            const {data} = response
            console.log(data)
            navigate(`/subscriptions`)
            
        })
        promise.catch(erro => console.log(erro.response))
    }

    return (
        <div className="footer">
            <button onClick={() => alterar()}>Mudar Plano</button>
            <button onClick={() => cancelar()}>Cancelar Plano</button>
        </div>
    )
}