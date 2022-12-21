import { useContext } from 'react'
import { AppContext } from '../../context/context'
import { EstilizarTema } from '../../functions/funcoes'
import styles from './Filter.module.css'

const Filter = () => {
    const {temaTela, linguaSelecionada, listaDePaisesEN, listaDePaises, setListaApresentada, setFiltro, setPesquisa, listaDeDescricoes} = useContext(AppContext)

    function Mudar(valor){
        setPesquisa('')
        setFiltro(valor)
        let novaLista = []
        if(valor === 'Todas'){
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
                        if(valor === pais.localizacao.regiao.nome){
                            novaLista.push(pais)
                        }
                    }
                )
            }
            else{
                listaDePaisesEN.map(
                    (pais) => {
                        if(valor === pais.localizacao.regiao.nome){
                            novaLista.push(pais)
                        }
                    }
                )
            }
        }
        setListaApresentada(novaLista)
    }

    return(
        <div className={EstilizarTema(temaTela, styles.Filter, styles.FilterClaro)}>
            <select className={EstilizarTema(temaTela, styles.Opcoes, styles.OpcoesClaro)} onChange={(e) => Mudar(e.target.value)}>
                <option value='Todas'>{listaDeDescricoes.filtro[0]}</option>
                <option value={listaDeDescricoes.filtro[1]}>{listaDeDescricoes.filtro[1]}</option>
                <option value={listaDeDescricoes.filtro[2]}>{listaDeDescricoes.filtro[2]}</option>
                <option value={listaDeDescricoes.filtro[3]}>{listaDeDescricoes.filtro[3]}</option>
                <option value={listaDeDescricoes.filtro[4]}>{listaDeDescricoes.filtro[4]}</option>
                <option value={listaDeDescricoes.filtro[5]}>{listaDeDescricoes.filtro[5]}</option>
            </select>
        </div>
    )
}

export default Filter