import { useContext } from 'react'
import { AppContext } from '../../context/context'
import Card from '../Card/card'
import Filter from '../Filter/filter'
import MaisInformacoes from '../MaisInformacoes/maisInformacoes'
import Navbar from '../Navbar/navbar'
import Search from '../Search/search'
import styles from './Container.module.css'
import { BsFillArrowUpCircleFill } from "react-icons/bs"
import { EstilizarTema } from '../../functions/funcoes'

const Container = () => {
    const {temaTela, visibilidade, listaApresentada, listaComplementar, telaInformacoes} = useContext(AppContext)

    function GeraComplemento(codigo){
        let complemento = {}
        listaComplementar.map(
            (pais) => {
                if(codigo === pais.cca3){
                    complemento = pais
                }
            }
        )
        return complemento
    }

    function VoltarParaInicio(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
    }

    function MudarVisibilidade(){
        if(visibilidade){
            return `${styles.VoltarAoTopo}`
        }
        else{
            return `${styles.VoltarAoTopo} ${styles.VoltarAoTopoInvisivel}`
        }
    }

    return(
        <div className={EstilizarTema(temaTela, styles.Container, styles.ContainerClaro)}>
            {
                (telaInformacoes) && <MaisInformacoes/>
            }
            <Navbar/>
            <div className={styles.Menu}>
                <Search/>
                <Filter/>
            </div>
            <div className={styles.BoxCards}>
                {
                    listaApresentada.map(
                        (pais) => <Card 
                            key={listaApresentada.indexOf(pais)} 
                            indice={listaApresentada.indexOf(pais)}
                            codigoPais={pais.id['ISO-3166-1-ALPHA-2']}
                            nome={pais.nome['abreviado'].split("(",1)}
                            capital={pais.governo.capital['nome']}
                            regiao={pais.localizacao.regiao.nome}
                            complemento={GeraComplemento(pais.id['ISO-3166-1-ALPHA-3'])}
                        />
                    )
                }
            </div>
            <div className={styles.BoxVoltarAoTopo}>
                <BsFillArrowUpCircleFill className={MudarVisibilidade()} onClick={VoltarParaInicio}/>
            </div>
        </div>
    )
}

export default Container