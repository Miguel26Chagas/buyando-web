import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { EyeClosed, Eye } from "lucide-react"
import { useAuthStore } from "../stores/authStore"
import api from "../services/api/api"

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
    };
    

    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await api.post('/auth/login', {username, password})
            const token =  response.data.access_token
            const { data: userData } = await api.get('/user/me', {headers: {Authorization: `Bearer ${token}`}})
            login(userData, token)

            toast.success('Login realizado com sucesso!')
            navigate('/user/dashboard')
        } catch (error) {
            console.error("Erro ao logar:", error?.response?.data || error.message);
            const errorMsg = error?.response?.data?.detail || error.message
            toast.error(errorMsg)
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="login-form h-[100dvh]">
            <div className="box-to-logo flex flex-col items-center pt-10">
                <Link to={'/'}>
                    <img src="Buyando-logo background.png" alt="logo-buyando" className="w-[18dvh] shadow-gray-300 shadow-2xl"/>
                </Link>
                <h1 className="text-primary mt-3 text-2xl">Buyando</h1>
            </div>
            <h2 className="my-3 text-xl text-gray-700">Login</h2>
            <Toaster position="top-right" />
            <form onSubmit={handleLogin} className=" flex flex-col items-center">
                <div className="input-group flex-row w-[90%] max-w-75">
                    {/* <label htmlFor="username" className="">Nome ou Email</label> */}
                    <input
                        type="text"
                        value={username}
                        autoFocus
                        onChange={(e) => {setUsername(e.target.value)}}
                        name="username" id="username"
                        placeholder="Nome ou Email"className="bg-gray-400/19 w-full p-2 pl-3.5 mt-2 mb-8 rounded-3xl" required />
                </div>
                <div className="input-group relative w-[90%] max-w-75">
                    {/* <label htmlFor="password">Senha</label> */}
                    <input
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Senha" className=" w-full bg-gray-400/19 p-2 pl-3.5 mt-2 pr-12 mb-4 rounded-3xl" required />
                    <button 
                        type="button"
                        className="absolute top-4.5 right-4"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={togglePasswordVisibility}>
                        {showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                </div>
                <p className="text-gray-700 mb-4">Entrar com <a href="#" className="text-blue-500 font-bold p-2 pl-1">google</a></p>
                <div className="w-full">
                    <button type="submit" disabled={loading} className="btn-submit-login cursor-pointer hover:bg-gray-50 hover:bg-zinc-800 bg-primary text-secondary p-2 mb-4 w-[60%] sm:w-47 sm:mx-2 font-medium rounded-3xl">{loading?'Entrando...' :'Entrar'}</button>
                    <button type="button" onClick={() => navigate('/register')} className="btn-submit-login hover:bg-gray-50 hover:bg-zinc-800 cursor-pointer bg-primary text-secondary p-2 w-[60%] sm:w-47 sm:mx-2 font-medium rounded-3xl">Criar Conta</button>
                </div>
            </form>
        </div>
    )
}