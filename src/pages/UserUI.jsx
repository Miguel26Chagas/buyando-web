import { Header } from "../components/ui/Header"
import { TopUserBar } from "../components/ui/TopUserBar"
import { CardProduct } from "../components/CardProduct"

export const UserUI = () => {
    return(
        <div>
            <Header />
            <main className="">
                <CardProduct />
            </main>
        </div>
    )
}