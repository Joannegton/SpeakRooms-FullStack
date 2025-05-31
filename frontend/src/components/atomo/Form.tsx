import { FormEvent, ReactNode } from 'react'

type FormProps = {
    title: string;
    subtitle?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    children?: ReactNode;
    className?: string;
    id?: string;
    method?: string;
    action?: string;
};

export const Form = ({ 
    title,
    subtitle,
    onSubmit, 
    children, 
    className, 
    id, 
    method, 
    action
}: FormProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form 
                action={action} 
                method={method} 
                id={id} 
                className={`max-w-[500px] p-6 bg-background ${className}`} 
                onSubmit={onSubmit}
                autoComplete="off"
            >
                <h1 className='text-2xl text-black font-bold text-center mb-1'>{title}</h1>
                
                {subtitle && <h2 className='text-center text-gray-secondary'>{subtitle}</h2>}
                
                <div className="mt-6">
                    {children}
                </div>
            </form>
        </div>
    )
}