import { useState } from 'react'
import styles from './Fronteira.module.css'

const Fronteira = ({imagem, nome}) => {
    const [descricaoFronteira, setDescricaoFronteira] = useState(false)

    function AtivaDescricaoFronteira(){
        setDescricaoFronteira(true)
    }
    
    function DesativaDescricaoFronteira(){
        setDescricaoFronteira(false)
    }

    return(
        <div className={styles.Fronteira} onMouseOver={AtivaDescricaoFronteira} onMouseOut={DesativaDescricaoFronteira}>
            {
                (descricaoFronteira) && <p className={styles.NomeFronteira}>{nome}</p>
            }
            <img 
                className={styles.BandeiraFronteira} 
                src={imagem} 
                alt='Bandeira da Fronteira'
            />
        </div>
    )
}

export default Fronteira