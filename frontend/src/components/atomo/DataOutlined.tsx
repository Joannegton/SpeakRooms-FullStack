import React, { useState, useEffect, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { CalendarToday, ChevronLeft } from '@mui/icons-material'

dayjs.locale('pt-br')

interface InputOutlinedProps {
    value: Dayjs | null;
    onChange: (date: Dayjs) => void;  
    label?: string;
    placeholder?: string;
    className?: string;
    mostrarIconeCalendario?: boolean;
}

export const DataOutlined = ({
    label,
    value,
    onChange,
    className = '',
}: InputOutlinedProps) => {
    const labelRef = useRef<HTMLLabelElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<Dayjs>(dayjs())
    const ref = useRef<HTMLDivElement>(null)
    const [posicaoVerticalCalendario, setPosicaoVerticalCalendario] = useState<'top' | 'bottom'>('bottom')
    const [posicaoHorizontalCalendario, setPosicaoHorizontalCalendario] = useState<'left' | 'right'>('left')

    useEffect(() => {
        const handleClickFora = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickFora)
        return () => document.removeEventListener('mousedown', handleClickFora)
    }, [])

    useEffect(() => {
        if (isOpen && ref.current) {
            const rect = ref.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            if (rect.bottom + 300 > viewportHeight) {
                setPosicaoVerticalCalendario('top')
            } else {
                setPosicaoVerticalCalendario('bottom')
            }
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && ref.current) {
            const rect = ref.current.getBoundingClientRect()
            const viewportWidth = window.innerWidth
            if (rect.left + 250 > viewportWidth) {
                setPosicaoHorizontalCalendario('right')
            } else {
                setPosicaoHorizontalCalendario('left')
            }
        }
    }, [isOpen])

    const dataInicial = data.startOf('month').startOf('week')
    const dataFinal = data.endOf('month').endOf('week')
    const dias: Dayjs[] = []

    let date = dataInicial
    while (date.isBefore(dataFinal) || date.isSame(dataFinal, 'day')) {
        dias.push(date)
        date = date.add(1, 'day')
    }

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const anos = Array.from({ length: 11 }, (_, i) => dayjs().year() - i)

    const handleSelecionaData = (date: Dayjs) => {
        onChange(date)
        setIsOpen(false)
    }

    const isMesmoDia = (d1: Dayjs, d2: Dayjs) => d1.isSame(d2, 'day')

    return (
        <div className="relative">
            {label && (
                <label
                    ref={labelRef}
                    className={`
                    absolute left-2 transition-all pointer-events-none truncate z-10 w-fit
                    ${value ? 'px-1 text-xs -top-2 text-gray-700 bg-white' : 'top-3 text-gray-400'}
                `}
                >
                    {label}
                </label>
            )}
            <div className="flex items-center">
                <div className="relative" ref={ref}>
                    <input
                        readOnly
                        onClick={() => setIsOpen(!isOpen)}
                        value={value && value.isValid() ? value.format('DD/MM/YYYY') : ''}
                        className={`outline-none w-[110px] px-2 py-2 focus:outline focus:border-gray-500 border-2 border-solid border-gray-300 rounded-md ${className}`}
                    />
                    
                    <div className="absolute right-2 top-2 text-gray-400 cursor-pointer lg:hidden">
                        <CalendarToday
                            fontSize='small'
                        />
                    </div>

                    {isOpen && (
                        <div
                            className={`absolute flex flex-col z-10 bg-zinc-50 rounded-lg shadow-lg p-4 w-[300px] lg:w-[240px] ${
                                posicaoVerticalCalendario === 'top' ? 'bottom-full mb-2' : 'mt-2'
                            } ${
                                posicaoHorizontalCalendario === 'right' ? 'right-0' : 'left-0'
                            }`}
                        >
                            <h3 className='text-sm text-center mb-1 bg-zinc-100 font-medium'>{label}</h3>
                            <div className="flex justify-between items-center mb-2">
                                <button 
                                    className="text-sm text-green-500 hover:text-green-700"
                                    onClick={() => setData(data.subtract(1, 'month'))}
                                >
                                    <ChevronLeft />
                                </button>

                                <div className="flex gap-1">
                                    <select
                                        value={data.month()}
                                        onChange={(e) => setData(data.month(Number(e.target.value)))}
                                        className="border border-green-500 w-[85px] rounded px-1 text-xs"
                                    >
                                        {meses.map((mes, i) => (
                                            <option key={mes} value={i}>{mes}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={data.year()}
                                        onChange={(e) => setData(data.year(Number(e.target.value)))}
                                        className="border border-green-500 rounded px-1 text-xs"
                                    >
                                        {anos.map((ano) => (
                                            <option key={ano} value={ano}>{ano}</option>
                                        ))}
                                    </select>
                                </div>

                                <button 
                                    className="text-sm text-green-500 hover:text-green-700"
                                    onClick={() => setData(data.add(1, 'month'))}
                                >
                                    <ChevronLeft style={{ transform: 'rotate(180deg)' }} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 text-center font-medium text-xs mb-2">
                                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
                                    <div>{d}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 text-center text-sm">
                                {dias.map((d) => {
                                    const isMesAtual = d.month() === data.month()
                                    const isSelecionado = value && isMesmoDia(d, value)
                                    const isHoje = isMesmoDia(d, dayjs())
                                    return (
                                        <button
                                            onClick={() => handleSelecionaData(d)}
                                            className={`py-2 lg:py-1 rounded-md transition cursor-pointer
                                                ${isMesAtual ? 'text-black' : 'text-gray-400'}
                                                ${isHoje ? 'text-green-500' : ''}
                                                ${isSelecionado ? 'bg-green-500 !text-white' : 'hover:bg-green-200'}`}
                                        >
                                            {d.date()}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}