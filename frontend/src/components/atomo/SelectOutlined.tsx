/* eslint-disable consistent-return */
import { useState, useRef, useEffect, KeyboardEvent, CSSProperties } from 'react'
import SimpleBar from 'simplebar-react'

interface SelectOutlinedProps {
  value: string | undefined;
  label?: string;
  options: Record<string, string>;
  className?: string;
  onChange: (value: string) => void;
  error?: string; // nova prop
}

export const SelectOutlined = ({
    label,
    value,
    options,
    onChange,
    className,
    error, // nova prop
}: SelectOutlinedProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [foco, setFoco] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
    const [showDropdown, setShowDropdown] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLLabelElement>(null)
    const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({})

    // Lista de chaves válidas (agora inclui todas as chaves)
    const validKeys = Object.keys(options)
    const allOptions = ['', ...validKeys]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setFoco(false)
                setHighlightedIndex(-1)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (isOpen) {
            setShowDropdown(true)
        } else {
            const timeout = setTimeout(() => setShowDropdown(false), 150)
            return () => clearTimeout(timeout)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const dropdownHeight = 240
            const spaceBelow = window.innerHeight - rect.bottom - 8
            const top = rect.bottom
            const left = rect.left
            const maxHeight = Math.min(dropdownHeight, spaceBelow)

            setDropdownStyle({
                position: 'fixed',
                top: Math.max(top, 8),
                left: left,
                width: rect.width,
                zIndex: 50,
                maxHeight: maxHeight > 0 ? maxHeight : 100,
            })
        }
    }, [isOpen])

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen && (event.key === 'Enter' || event.key === ' ')) {
            setIsOpen(true)
            setFoco(true)
            setHighlightedIndex(0)
            event.preventDefault()
        } else if (isOpen) {
            switch (event.key) {
            case 'ArrowDown':
                setHighlightedIndex((prev) =>
                    prev < allOptions.length - 1 ? prev + 1 : 0
                )
                event.preventDefault()
                break
            case 'ArrowUp':
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : allOptions.length - 1
                )
                event.preventDefault()
                break
            case 'Enter':
                if (highlightedIndex >= 0) {
                    const key = allOptions[highlightedIndex]
                    handleOptionClick(key)
                }
                event.preventDefault()
                break
            case 'Escape':
                setIsOpen(false)
                setFoco(false)
                setHighlightedIndex(-1)
                event.preventDefault()
                break
            }
        }
    }

    const getDisplayValue = () => {
        if (!value) return ''
        return options[value] ? formatText(options[value]) : 'Selecione uma opção'
    }

    const formatText = (text: string) => {
        return text
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/^\w|\s\w/g, (letter) => letter.toUpperCase())
    }

    const handleOptionClick = (optionKey: string) => {
        onChange(optionKey)
        setIsOpen(false)
        setFoco(false)
        setHighlightedIndex(-1)
    }

    return (
        <div
            className={`relative h-[44px] ${className}`}
            ref={containerRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-expanded={isOpen}
            aria-label={label || 'Selecione uma opção'}
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="select-listbox"
            aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
        >
            {label && (
                <label
                    ref={labelRef}
                    className={`
                        absolute left-2 transition-all pointer-events-none truncate z-10
                        ${foco || value ? 'px-1 text-xs -top-2 text-gray-700 bg-white' : 'top-2.5 text-gray-400'}
                    `}
                >
                    {label}
                </label>
            )}
            <div
                className={`
                    w-full h-full px-2 py-2 border-2 border-solid rounded-md
                    flex items-center justify-between cursor-pointer
                    ${foco || value ? 'border-gray-500 bg-white' : 'border-gray-300'}
                `}
                onClick={() => {
                    setIsOpen(!isOpen)
                    setFoco(true)
                    setHighlightedIndex(0)
                }}
                onFocus={() => setFoco(true)}
                onBlur={() => setFoco(false)}
            >
                <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {getDisplayValue()}
                </span>
                <span className="text-gray-400 text-xs">▼</span>
            </div>
            {error && (
                <span className="text-red-500 text-xs font-medium absolute left-0 mt-1">{error}</span>
            )}
            {showDropdown && (
                <SimpleBar
                    style={dropdownStyle}
                    className={`
                        bg-white border border-gray-300 rounded-md shadow-lg
                        transition-all duration-150
                        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                    `}
                    id="select-listbox"
                    role="listbox"
                >
                    <ul>
                        <li
                            id="option-0"
                            className={`
                                px-2 py-2 cursor-pointer hover:bg-gray-100
                                text-ellipsis overflow-hidden whitespace-nowrap
                                ${highlightedIndex === 0 ? 'bg-gray-100' : ''}
                            `}
                            onClick={() => handleOptionClick('')}
                            onMouseEnter={() => setHighlightedIndex(0)}
                            role="option"
                            aria-selected={value === '' || !value}
                        >
                            Selecione uma opção
                        </li>
                        {validKeys.map((key, index) => (
                            <li
                                id={`option-${index + 1}`}
                                key={key}
                                className={`
                                    px-2 py-2 cursor-pointer hover:bg-gray-100
                                    text-ellipsis overflow-hidden whitespace-nowrap
                                    ${index + 1 === highlightedIndex ? 'bg-gray-100' : ''}
                                `}
                                onClick={() => handleOptionClick(key)}
                                onMouseEnter={() => setHighlightedIndex(index + 1)}
                                role="option"
                                aria-selected={key === value}
                            >
                                {formatText(options[key])}
                            </li>
                        ))}
                    </ul>
                </SimpleBar>
            )}
        </div>
    )
}