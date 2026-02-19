import { Header } from "../components/ui/Header"
import { CardProduct } from "../components/CardProduct"
import { LoginBar } from "../components/ui/LoginBar"

import { useAuthStore } from "../stores/authStore"

export const Home = () => {
const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    return(
        <div className="">
            {!isAuthenticated && <LoginBar /> }
            <Header />
            <main>
                <h3 className="w-[90%] max-w-[420px] text-start font-semibold text-[16pt] mx-auto mt-6 mb-4">Tudo</h3>
                <CardProduct />
            </main>
        </div>
    )
}