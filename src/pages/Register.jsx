import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed, Image } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import api_register from "../services/api/api_register"
import { useState } from "react"
import { useAuthStore } from "../stores/authStore"
import api from "../services/api/api"

export const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [photo_file, setPhoto_File] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
    };
    
    
    const navigate = useNavigate()
    const login = useAuthStore(state => state.login)

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        if (photo_file) {
            formData.append('photo_file', photo_file)
        }

        const nowLogin = async (username, password) => {
            const response = await api.post('/auth/login', {username, password})
            const token = response.data.access_token
            const { data: userData } = await api.get('/user/me', {headers: {Authorization: `Bearer ${token}`}})
            login({userData, token})
            navigate('/user/dashboard')
        }

        try {
            const response = await api_register.post('auth/register', formData)
            console.log('Registado Com Sucesso!')
            console.log(response)
            toast.success('Conta criada com sucesso!')
            nowLogin(name || email, password)

        } catch (error) {
            console.error('erro ao Registar', error?.response?.data || error.message)
            const erroMsg = error?.response?.data?.detail || error.message
            toast.error(erroMsg)
        } finally {
            setLoading(false)
        }
    }

    console.log('olhe olhe', photo_file)


    return(
        <div className="login-form h-[100dvh]">
            <div className="box-to-logo flex flex-col items-center pt-10">
                <Link to={'/'}>
                    <img src="Buyando-logo background.png" alt="logo-buyando" className="w-[15dvh] shadow-gray-300 shadow-2xl"/>
                </Link>
                <h1 className="text-primary mt-3 text-2xl">Buyando</h1>
            </div>
            <h2 className="my-3 text-xl text-gray-700">Registrar</h2>
            <Toaster position="top-right" />
            <form className="flex flex-col items-center pb-7" encType="multipart/form-data" onSubmit={handleRegister}>
                <div className="input-group w-[90%] max-w-75">
                    {/* <label htmlFor="username" className="">Nome ou Email</label> */}
                    <input
                        type="text"
                        autoFocus
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        name="name" id="name"
                        placeholder="Nome Completo"className="bg-gray-400/19 p-2 pl-3.5 mt-2 mb-8 w-full rounded-3xl" required />
                </div>
                <div className="input-group w-[90%] max-w-75">
                    {/* <label htmlFor="username" className="">Nome ou Email</label> */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        name="name" id="name"
                        placeholder="Email (ex: exemplo@gmail.com)"className="bg-gray-400/19 p-2 pl-3.5 mt-2 mb-8 w-full rounded-3xl" required />
                </div>
                <div className="input-group relative w-[90%] max-w-75">
                    {/* <label htmlFor="password">Senha</label> */}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        id="password"
                        placeholder="Senha" className=" bg-gray-400/19 p-2 pl-3.5 mt-2 mb-4 w-full pr-12 rounded-3xl" required />
                    <button type="button" className="absolute top-4.5 right-4" onMouseDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
                        {showPassword ? <Eye/> : <EyeClosed/>}
                    </button>
                </div>
                <div className="input-group my-6 max-w-[93px] mx-auto">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e)=> setPhoto_File(e.target.files[0]) }
                        name="photo_file" id="photo_file"
                        placeholder="Adicione uma Foto de Perfil" className="hidden" />
                    <label htmlFor="photo_file"
                           className="text-[7pt] cursor-pointer relative overflow-hidden flex p-1 rounded-xl shadow-sm bg-gray-400/50 flex-col items-center">
                        <Image size={64} />
                        <span>Adicione Foto de <br /> Perfil (Opcional)</span>
                        <div className="absolute top-0 w-full h-full">
                            <img src={photo_file && (URL.createObjectURL(photo_file))} className={photo_file && ('h-[13dvh] w-full h-full object-cover')} alt="" />
                        </div>
                    </label>
                </div>
                <p className="text-gray-700 mb-4">Registrar com <a href="#" className="text-blue-500 font-bold p-2 pl-1">google</a></p>
                <button type="submit" disabled={loading} className="btn-submit-login cursor-pointer hover:bg-gray-50 hover:bg-zinc-800 bg-primary text-secondary p-2 mb-6 w-[60%] sm:w-47 sm:mx-2 font-medium rounded-3xl">{loading ? 'Criando Conta...' : 'Criar Conta'}</button>
                <button type="button" onClick={()=> navigate('/login')} className="btn-submit-login hover:bg-gray-50 hover:bg-zinc-800 cursor-pointer border-2 border-primary bg-secondary text-primary p-2 w-[60%] sm:w-47 sm:mx-2 font-medium rounded-3xl">Já Tenho Conta</button>
            </form>
        </div>
    )
}