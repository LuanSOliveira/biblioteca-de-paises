import { useContext } from 'react'
import { AppContext } from '../../context/context'
import styles from './MaisInformacoes.module.css'
import { AiFillCloseCircle, AiFillDollarCircle } from "react-icons/ai"
import { MdPlace } from "react-icons/md"
import { HiUserGroup } from "react-icons/hi"
import { BiWorld } from "react-icons/bi"
import { TiWorld } from "react-icons/ti"
import { GiBlackFlag, GiOpenBook } from "react-icons/gi"
import { TbNetwork } from "react-icons/tb"
import Fronteira from '../Fronteira/fronteira'
import { EstilizarTema } from '../../functions/funcoes'

const MaisInformacoes = () => {
    const {temaTela, setVisibilidade, linguaSelecionada, listaDePaises, listaDePaisesEN, listaApresentada,
           paisSelecionado, setTelaInformacoes, listaDeDescricoes} = useContext(AppContext)

    const bandeira = paisSelecionado.bandeira
    const nomePais = listaApresentada[paisSelecionado.id].nome['abreviado'].split("(",1)
    const linguas = listaApresentada[paisSelecionado.id].linguas
    const nomeNativo = DefineNomeNativo()
    const populacao = paisSelecionado.complemento.population
    const regiao = listaApresentada[paisSelecionado.id].localizacao['regiao'].nome
    const subRegiao = listaApresentada[paisSelecionado.id].localizacao['sub-regiao'].nome
    const capital = listaApresentada[paisSelecionado.id].governo.capital.nome
    const dominio = paisSelecionado.complemento.tld[0]
    const moeda = `${listaApresentada[paisSelecionado.id]['unidades-monetarias'][0].id['ISO-4217-ALPHA']} - ${listaApresentada[paisSelecionado.id]['unidades-monetarias'][0].nome}`
    let semFronteira = true
    const fronteiras = DefineFronteiras()
    let listaInfoFronteiras = []
    BuscarInfoFronteiras()

    function DefineNomeNativo(){
        const codigoDeNomes = Object.keys(paisSelecionado.complemento.name.nativeName)
        return paisSelecionado.complemento.name.nativeName[codigoDeNomes[0]].common

    }

    function DefineFronteiras(){
        if(paisSelecionado.complemento.borders){
            semFronteira = false
            return paisSelecionado.complemento.borders
        }
        else{
            return ['Sem Fronteiras']
        }
    }

    function BuscarInfoFronteiras(){
        if(semFronteira === false){
            fronteiras.map(
                (fronteira) => {
                    if(linguaSelecionada === 'por'){
                        listaDePaises.map(
                            (pais) => {
                                if(fronteira === pais.id['ISO-3166-1-ALPHA-3']){
                                    listaInfoFronteiras.push(pais)
                                }
                            }
                        )
                    }
                    else{
                        listaDePaisesEN.map(
                            (pais) => {
                                if(fronteira === pais.id['ISO-3166-1-ALPHA-3']){
                                    listaInfoFronteiras.push(pais)
                                }
                            }
                        )
                    }
                }
            )
        }
    }

    function FecharInformacoes(){
        setVisibilidade(true)
        setTelaInformacoes(false)
    }

    return(
        <div className={styles.BoxMaisInformacoes}>
            <div className={EstilizarTema(temaTela, styles.MaisInformacoes, styles.MaisInformacoesClaro)}>
                <section className={styles.BoxBandeira}>
                    <img className={styles.Bandeira} src={bandeira} alt='Bandeira do país'/>
                </section>
                <section className={styles.SecInformacoes}>
                    <p className={styles.NomePais}>{nomePais}</p>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><MdPlace/> {listaDeDescricoes.nativo}</p>
                        <p>{nomeNativo}</p>
                    </div>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><HiUserGroup/> {listaDeDescricoes.populacao}</p>
                        <p>{populacao}</p>
                    </div>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><BiWorld/> {listaDeDescricoes.regiao}</p>
                        <p>{regiao}</p>
                    </div>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><TiWorld/> {listaDeDescricoes.subregiao}</p>
                        <p>{subRegiao}</p>
                    </div>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><GiBlackFlag/> {listaDeDescricoes.capital}</p>
                        <p>{capital}</p>
                    </div>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><TbNetwork/> {listaDeDescricoes.dominio}</p>
                        <p>{dominio}</p>
                    </div>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><AiFillDollarCircle/> {listaDeDescricoes.moeda}</p>
                        <p>{moeda}</p>
                    </div>
                    <div className={styles.ParagrafoInformacao}>
                        <p className={styles.DescricaoInformacao}><GiOpenBook/> {listaDeDescricoes.linguas}</p>
                        {linguas.map((lingua) => <p key={lingua.id}>{lingua.nome}</p>)}
                    </div>
                    <div className={styles.ParagrafoFronteiras}>
                        <p className={styles.DescricaoInformacao}>{listaDeDescricoes.fronteira}</p>
                        <div className={styles.BoxFronteiras}>
                            {listaInfoFronteiras.map(
                                (pais) => <Fronteira 
                                                imagem={`https://flagcdn.com/w320/${pais.id['ISO-3166-1-ALPHA-2'].toLowerCase()}.png`}
                                                nome={pais.nome['abreviado'].split("(",1)}
                                                key={listaInfoFronteiras.indexOf(pais)}
                                            />
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.BoxFechar}>
                <AiFillCloseCircle className={styles.Fechar} onClick={FecharInformacoes}/>
            </div>
        </div>
    )
}

export default MaisInformacoes