import { Botao } from '../components/atomo/Botao'
import ChatRoomCard from '../components/molecula/ChatRoomCard'
import { LoginForm } from '../components/organismo/form'

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
            <LoginForm/>
        </div>
    )}
