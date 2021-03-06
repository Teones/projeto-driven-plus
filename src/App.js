import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import Login from "./components/tela-login"
import Cadastro from "./components/tela-cadastro"
import Planos from "./components/tela-planos"
import Plano from "./components/tela-plano"
import Home from "./components/tela-home"


export default function App () {
    const [dados, setDados] = useState("")

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setDados={setDados} />} />
                <Route path="/sign-up" element={<Cadastro />} />
                <Route path="/subscriptions" element={<Planos dados={dados.token} />} />
                <Route path="/subscriptions/:id" element={<Plano dados={dados.token} setDados={setDados} />} />
                <Route path="/home" element={<Home dados={dados} />} />
            </Routes>
        </BrowserRouter>
    )
}