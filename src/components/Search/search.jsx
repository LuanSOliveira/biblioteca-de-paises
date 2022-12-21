import styles from './Search.module.css'
import { AiOutlineSearch } from "react-icons/ai"
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/context'
import { EstilizarTema } from '../../functions/funcoes'

const Search = () => {
    const {temaTela, visibilidade, linguaSelecionada, listaDePaisesEN, listaDePaises, listaApresentada, setListaApresentada,
           pesquisa, setPesquisa, filtro, listaDeDescricoes} = useContext(AppContext)
    
    function RealizaFiltro(){
        let novaLista = []
        if(filtro === 'Todas'){
            if(linguaSelecionada === 'por'){
                novaLista = listaDePaises
            }
            else{
                novaLista = listaDePaisesEN
            }
        }
        else{
            if(linguaSelecionada === 'por'){
                listaDePaises.map(
                    (pais) => {
                        if(filtro === pais.localizacao.regiao.nome){
                            novaLista.push(pais)
                        }
                    }
                )
            }
            else{
                listaDePaisesEN.map(
                    (pais) => {
                        if(filtro === pais.localizacao.regiao.nome){
                            novaLista.push(pais)
                        }
                    }
                )
            }
        }
        setListaApresentada(novaLista)
    }

    function Digitar(evento){
        setPesquisa(evento.target.value)
    }

    function DefineVisibilidade(){
        if(visibilidade){
            return `${styles.Icon}`
        }
        else{
            return `${styles.Icon} ${styles.IconInvisivel}`
        }
    }

    useEffect(() =>{
        RealizaFiltro()

        if(pesquisa === ''){
            RealizaFiltro()
        }
        else{
            let listaAtualizada = []
            listaApresentada.map(
                (pais) =>{
                    const nomeDoPais = pais.nome['abreviado']
                    if(nomeDoPais.toUpperCase().includes(pesquisa.toUpperCase())){
                        listaAtualizada.push(pais)
                    }
                }
            )
            setListaApresentada(listaAtualizada)
        }
    }, [pesquisa])

    return(
        <div className={styles.Search}>
            <AiOutlineSearch className={DefineVisibilidade()}/>
            <input 
                className={EstilizarTema(temaTela, styles.Buscar, styles.BuscarClaro)} 
                placeholder={listaDeDescricoes.pesquisa}
                value={pesquisa}
                onChange={(e) => Digitar(e)}
            />
        </div>
    )
}

export default Search