import { Botao } from '../components/atomo/Botao'

export const App = () => {
    return (
        <div>
            <Botao 
                texto='Clique aqui'
                onClick={() => alert('Botão clicado!')}
                desabilitado={false}
                tamanho='pequeno'
                icone={<span>🔔</span>}
                variante='primario'
                iconePosicao='direita'
                className='p-7'
            />
        </div>
    )}
