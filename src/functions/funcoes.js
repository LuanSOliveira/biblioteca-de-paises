export function EstilizarTema(tema, modoEscuro, modoClaro){
    if(tema === 'branco'){
        return `${modoEscuro} ${modoClaro}`
    }
    else{
        return `${modoEscuro}`
    }

}