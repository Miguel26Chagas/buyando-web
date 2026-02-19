import { Thumbnail } from "../Thumbnail"
import { Link } from "react-router-dom"

export const TopUserBar = () => {
    return (
        <div className="z-50 pt-4 flex bg-white flex-row justify-between items-center mx-auto">
            <h1 className="font-bold text-shadow-[0_0_3px_rgba(0,0,0,0.1)]">
                <Link className="text-[15pt]" to={'/'}>Buyando</Link>
            </h1>
            <Thumbnail />
        </div>
    )
}