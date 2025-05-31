/* eslint-disable consistent-return */
import React, { ReactNode, useEffect, useRef } from 'react'

type ClassNamesProps = {
    footerClassName?: string
    modalClassName?: string
}

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  classNames?: ClassNamesProps;
  onClose: () => void;
  footer?: ReactNode;
}

const Modal = ({
    open,
    title,
    children,
    classNames,
    onClose,
    footer,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) {return}
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {onClose()}
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [open, onClose])

    useEffect(() => {
        if (open && modalRef.current) {
            modalRef.current.focus()
        }
    }, [open])

    useEffect(() => {
        if (!open) {
            return
        }
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    useEffect(() => {
        if (!open || !modalRef.current) {
            return
        }
        const modal = modalRef.current
        const focusableSelectors = [
            'a[href]', 'button:not([disabled])', 'textarea', 'input', 'select', '[tabindex]:not([tabindex="-1"])'
        ]
        const getFocusable = () => Array.from(modal.querySelectorAll(focusableSelectors.join(',')))
        const handleTab = (e: KeyboardEvent) => {
            const focusable = getFocusable()
            if (focusable.length === 0) {
                return
            }
            const first = focusable[0] as HTMLElement
            const last = focusable[focusable.length - 1] as HTMLElement
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault()
                        last.focus()
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault()
                        first.focus()
                    }
                }
            }
        }
        modal.addEventListener('keydown', handleTab)
        return () => modal.removeEventListener('keydown', handleTab)
    }, [open])

    if (!open) {return null}

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {onClose()}
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            <div
                className="absolute inset-0 bg-black opacity-70"
                onClick={handleOverlayClick}
            />
            <div
                ref={modalRef}
                className={`relative bg-background rounded-lg shadow-xl p-6 w-full max-h-[90vh] max-w-[80vw] overflow-y-auto ${classNames?.modalClassName || ''}`}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                <button
                    className="absolute top-4 right-4 text-gray-secondary hover:text-gray-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1 cursor-pointer"
                    onClick={onClose}
                    aria-label="Fechar modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {title && (
                    <h2 id="modal-title" className="text-xl font-semibold text-gray-primary mb-4">
                        {title}
                    </h2>
                )}
                <div className='w-full h-full'>{children}</div>
                {footer && (
                    <div className={`mt-6 flex justify-end gap-3 ${classNames?.footerClassName || ''}`}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal