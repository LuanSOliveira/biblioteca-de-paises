import { useContext } from 'react'
import { AppContext } from '../../context/context'
import { EstilizarTema } from '../../functions/funcoes'
import styles from './Card.module.css'

const Card = ({indice, codigoPais, nome, capital, regiao, complemento}) => {

    const {temaTela, setVisibilidade, setTelaInformacoes, setPaisSelecionado, listaDeDescricoes} = useContext(AppContext)
    
    function Clicar(){
        setTelaInformacoes(true)
        setVisibilidade(false)
        setPaisSelecionado(
            {
                id: indice,
                complemento: complemento,
                bandeira: `https://flagcdn.com/w320/${codigoPais.toLowerCase()}.png`
            }
        )
    }

    return(
        <div className={EstilizarTema(temaTela, styles.Card, styles.CardClaro)} onClick={Clicar}>
            <img className={styles.Imagem} src={`https://flagcdn.com/w320/${codigoPais.toLowerCase()}.png`} alt='Bandeira do país'/>
            <div className={styles.BoxInfo}>
                <h3>{nome}</h3>
                <div className={styles.Info}>
                    <p className={styles.Descricao}>{listaDeDescricoes.populacao}</p>
                    <p className={styles.Valor}>{complemento.population}</p>
                </div>
                <div className={styles.Info}>
                    <p className={styles.Descricao}>{listaDeDescricoes.regiao}</p>
                    <p className={styles.Valor}>{regiao}</p>
                </div>
                <div className={styles.Info}>   
                    <p className={styles.Descricao}>{listaDeDescricoes.capital}</p>
                    <p className={styles.Valor}>{capital}</p>
                </div>
            </div>
        </div>
    )
}

export default Card