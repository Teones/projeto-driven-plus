import logoPlus from "../../assepts/logo-driven-white.png"
import logoGold from "../../assepts/logo-driven-yellow.png"
import logoPlatinun from "../../assepts/logo-driven-green.png"

export default function Plano () {
    const planos = [
        {classe: "Plano Plus" ,imagem: `${logoPlus}`, valor: "R$ 39,99", beneficios:["brindes exclusivos", "material bônus Web"]},
        {classe: "Plano Gold" ,imagem: `${logoGold}`, valor: "R$ 39,99", beneficios:["brindes exclusivos", "material bônus Web"]},
        {classe: "Plano Platinum" ,imagem: `${logoPlatinun}`, valor: "R$ 39,99", beneficios:["brindes exclusivos", "material bônus Web"]}
    ]

    return (
        <div className="plano">
            <Logo classe={planos[0].classe} imagem={planos[0].imagem} />)
        </div>
    )
}

function Logo ({classe, imagem}) {
    return (
        <div className="logo">
            <img src={imagem} alt={classe} />
            {classe}
        </div>
    )
}