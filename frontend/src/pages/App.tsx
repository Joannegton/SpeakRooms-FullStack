import { Botao } from '../components/atomo/Botao'
import { EntradaTexto } from '../components/atomo/EntradaTexto'
import ChatRoomCard from '../components/molecula/ChatRoomCard'

export const App = () => {
    return (
        <div className='font-poppins'>
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
            <ChatRoomCard title={'Iniciando na plataforma'} level={'Beginner'} participants={7} />
            <EntradaTexto label='Número' type={'password'} placeholder='Número' />
        </div>
    )}
