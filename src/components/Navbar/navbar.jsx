import styles from './Navbar.module.css'

import { BsMoon } from "react-icons/bs"
import { useContext } from 'react'
import { AppContext } from '../../context/context'
import { listaEng, listaPor } from '../../list/lista'
import { EstilizarTema } from '../../functions/funcoes'

const Navbar = () => {
    const {linguaSelecionada, temaTela, setTemaTela, setLinguaSelecionada, listaDePaises, listaDePaisesEN, setListaApresentada,
           setFiltro, setPesquisa, listaDeDescricoes, setListaDeDescricoes} = useContext(AppContext)

    function EstilizarLinguaPor(){
        if(linguaSelecionada === 'por'){
            return `${styles.Lingua} ${styles.LinguaSelecionada}`
        }
        else{
            return `${styles.Lingua}`
        }
    }

    function EstilizarLinguaEng(){
        if(linguaSelecionada === 'eng'){
            return `${styles.Lingua} ${styles.LinguaSelecionada}`
        }
        else{
            return `${styles.Lingua}`
        }
    }

    function AlteraLinguaPor(){
        setLinguaSelecionada('por')
        setFiltro('Todas')
        setPesquisa('')
        setListaDeDescricoes(listaPor)
        setListaApresentada(listaDePaises)
    }

    function AlteraLinguaEng(){
        setLinguaSelecionada('eng')
        setFiltro('Todas')
        setPesquisa('')
        setListaDeDescricoes(listaEng)
        setListaApresentada(listaDePaisesEN)
    }

    function AlterarTema(){
        if(temaTela === 'branco'){
            setTemaTela('preto')
        }
        else{
            setTemaTela('branco')
        }
    }

    return(
        <header className={EstilizarTema(temaTela, styles.Navbar, styles.NavbarClaro)}>
            <h1>{listaDeDescricoes.titulo}</h1>
            <div>
                <img className={EstilizarLinguaPor()} src='https://flagcdn.com/w320/br.png' alt='Bandeira BR' onClick={AlteraLinguaPor}/>
                <img className={EstilizarLinguaEng()} src='https://flagcdn.com/w320/us.png' alt='Bandeira EUA' onClick={AlteraLinguaEng}/>
            </div>
            <div className={styles.Temas} onClick={AlterarTema}>
                <BsMoon className={styles.Icon}/>
                <p>{listaDeDescricoes.tema}</p>
            </div>
        </header>
    )
}

export default Navbar