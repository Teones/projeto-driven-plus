import { useNavigate } from "react-router-dom"
import "./styles.css"

export default function Home ({dados}) {
    console.log(dados)
    return (
        <div className="home">
            <Header logo={dados.membership.image} />
            <BoasVindas nome={dados.name} />
            <Beneficios beneficios={dados.membership.perks} />
            <Footer />
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
            {beneficios.map(beneficio => <Beneficio titulo={beneficio.title} />)}
        </div>
    )
}
function Beneficio ({titulo}) {
    return (
        <div className="beneficio">
            <button>{titulo}</button>
        </div>
    )
}

function Footer () {
    const navigate = useNavigate()

    function alterar () {
        navigate("/subscriptions")
    }
    function cancelar() {
        console.log("calma, não cancelou não")
    }

    return (
        <div className="footer">
            <button onClick={() => alterar()}>Mudar Plano</button>
            <button onClick={() => cancelar()}>Cancelar Plano</button>
        </div>
    )
}