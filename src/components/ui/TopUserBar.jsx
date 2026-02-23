import { Thumbnail } from "../Thumbnail"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"

export const TopUserBar = () => {
    return (
        <div className="z-50 pt-4 flex bg-white flex-row justify-between items-center mx-auto">
            <h1 className="font-bold text-shadow-[0_0_3px_rgba(0,0,0,0.1)]">
                <Link className="text-[15pt]" to={'/'}>Buyando</Link>
            </h1>
            {/* <button className="p-2 px-3 hover:bg-zinc-800 ml-auto mb-1 bg-primary text-secondary text-[8pt] h-[34px] rounded-[2px] mr-4 shadow-[0_0_3px_rgba(0,0,0,0.1)]">MENU</button> */}
            <Thumbnail />
        </div>
    )
}