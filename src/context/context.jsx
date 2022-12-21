import { createContext, useEffect, useState } from "react";
import { listaPor } from "../list/lista";

export const AppContext = createContext()

const AppProvider = ({children}) =>{
    const [linguaSelecionada, setLinguaSelecionada] = useState('por')
    const [temaTela, setTemaTela] = useState('branco')
    const [visibilidade, setVisibilidade] = useState(true)
    const [listaDePaises, setListaDePaises] = useState([])
    const [listaDePaisesEN, setListaDePaisesEN] = useState([])
    const [listaComplementar, setListaComplementar] = useState([])
    const [listaApresentada, setListaApresentada] = useState([])
    const [filtro, setFiltro] = useState('Todas')
    const [pesquisa, setPesquisa] = useState('')
    const [telaInformacoes, setTelaInformacoes] = useState(false)
    const [paisSelecionado, setPaisSelecionado] = useState({})
    const [listaDeDescricoes, setListaDeDescricoes] = useState(listaPor)

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/paises/')
        .then(response => response.json())
        .then((data) => {
            let lista = []
            let listaDeCodigos = []
            data.map(
                (pais) => {
                    const codigo = pais.id['ISO-3166-1-ALPHA-3']
                    if(listaDeCodigos.includes(codigo) === false){
                        listaDeCodigos.push(codigo)
                        lista.push(pais)
                    }
                }
            )
            setListaDePaises(lista)
            setListaApresentada(lista)
        })
    },[])

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/paises?lang=EN')
        .then(response => response.json())
        .then((data) => {
            let lista = []
            let listaDeCodigos = []
            data.map(
                (pais) => {
                    const codigo = pais.id['ISO-3166-1-ALPHA-3']
                    if(listaDeCodigos.includes(codigo) === false){
                        listaDeCodigos.push(codigo)
                        lista.push(pais)
                    }
                }
            )
            setListaDePaisesEN(lista)
        })
    },[])

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then((data) => {
            let lista = []
            data.map(
                (pais) => {
                    lista.push(pais)
                }
            )
            setListaComplementar(lista)
        })
    },[])

    return(
        <AppContext.Provider value={
            {
                linguaSelecionada, setLinguaSelecionada,
                temaTela, setTemaTela,
                visibilidade, setVisibilidade,
                listaDePaises, setListaDePaises,
                listaDePaisesEN, setListaDePaisesEN,
                listaComplementar, setListaComplementar,
                listaApresentada, setListaApresentada,
                filtro, setFiltro,
                pesquisa, setPesquisa,
                telaInformacoes, setTelaInformacoes,
                paisSelecionado, setPaisSelecionado,
                listaDeDescricoes, setListaDeDescricoes,
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;