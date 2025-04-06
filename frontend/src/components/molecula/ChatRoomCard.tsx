interface ChatRoomCardProps {
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  participants: number
}

const levelColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
}

export default function ChatRoomCard({ title, level, participants }: ChatRoomCardProps) {
    return (
        <div className="bg-secondary shadow-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-text mb-2">{title}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColor[level]}`}>
                {level}
            </span>
            <p className="text-border text-sm mt-4">{participants} participantes</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors">
        Entrar na sala
            </button>
        </div>
    )
}

