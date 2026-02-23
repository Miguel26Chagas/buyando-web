import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TopUserBar } from "../components/ui/TopUserBar"
import toast, {Toaster} from "react-hot-toast"
import { useAuthStore } from "../stores/authStore"
import { Home, Pen } from "lucide-react"
import api_updateData from "../services/api/api_updateData"


export const Profile = () => {
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('')
    
    const updateData = useAuthStore(state => state.updateUser)
    const user = useAuthStore(state => state.user)
    const token = useAuthStore.getState().token

    const handleAlterPhoto = async (e) => {
        e.preventDefault()
        const profile_photo = e.target.files[0]
        const old_photo = user.profile_photo

        if (!profile_photo) return

        if (profile_photo.size > 4 * 1024 * 1024) {
            toast.error('Imagem muito grande, não pode ter mais de 3MB')
            e.target.value = null; 
            return;
        }

        if (!profile_photo.type.startsWith('image/')) {
            toast.error('Tipo de Arquivo invalido.')
            e.target.value = null; 
            return;
        }
        const previewUrl = URL.createObjectURL(profile_photo)
        updateData({ profile_photo: previewUrl })

        const loadingToast = toast.loading('Enviando foto...')
        try {
            const formData = new FormData()
            formData.append('photo_file', profile_photo)

            const response = await api_updateData.post('/user/add_photo', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Sucesso!', response?.data)
            updateData({profile_photo: response?.data?.url})
            toast.success(response?.data?.msg, {
                id: loadingToast
            })
        } catch (error) {
            console.error('erro ao adiconar foto', error?.response?.data || error.message)
            const erroMsg = error?.response?.data?.detail || error.message
            updateData({ profile_photo: old_photo })
            toast.error(erroMsg, {
                id: loadingToast
            })
        } finally {
            URL.revokeObjectURL(previewUrl)
        }
    }

    const handleUpdateData = (e) => {
        e.preventDefault()
    }

    const handlePassword = (e) => {
        e.preventDefault()
    }

    const avatarUrl =
      user.profile_photo !== "No Profile Photo"
        ? user.profile_photo
        : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`

    return (
        <div className="relative">
            <header className="sticky top-0 pb-3 w-[90%] m-auto">
                {/* <TopUserBar /> */}
            </header>

            <main className="w-[90%] pb-2 m-auto">
                <div className="border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-start text-[16pt]">Perfil</h2>
                    <Link type="button" to={'/'} className="p-2 pr-0">
                        <Home size={25} />
                </Link>
                </div>
                <Toaster/>
                <div className="flex">
                    <div className="relative mt-3 w-[35%] mr-5 max-w-[150px]">
                        <img src={avatarUrl} alt="" className=" w-full rounded-xl"/>
                        <label 
                            htmlFor="photo_file"
                            className="cursor-pointer absolute bottom-5 bg-secondary/95 rounded-full p-2  shadow-sm -right-2"
                        >
                            <Pen size={18}/>
                        </label>
                        <span className="text-[7.5pt] text-gray-500 truncate">Mude a foto de perfil</span>
                        <input 
                            type="file"
                            id="photo_file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleAlterPhoto}
                            name="photo_file" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-[16pt]">{user.name}</h3>
                        <p className="text-gray-400 text-[12pt]">{user.email}</p>
                    </div>
                </div>

                <form>
                    
                </form>
            </main>
        </div>
    )
}