import { Link } from "react-router-dom"

export const LoginBar = () => {
    return (
        <div className="top-bar mt-4 flex flex-row justify-between items-center w-[90%] max-w-[420px] mx-auto">
            <h1 className="font-bold text-shadow-[0_0_3px_rgba(0,0,0,0.1)]">
                <Link className="text-[15pt]" to={'/'}>Buyando</Link>
            </h1>
            <Link to={'./login'} className="p-2 px-3.5 hover:bg-zinc-800 bg-primary text-secondary text-[11pt] rounded-md shadow-[0_0_3px_rgba(0,0,0,0.1)]">Entrar</Link>
        </div>
    )
} 