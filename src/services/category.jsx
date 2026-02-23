import { useState } from "react"

const CATEGORIES = [
    {id:1, label: 'Tudo',},
    {id:2, label: 'Vestidos',},
    {id:3, label: 'Sapatos',},
    {id:4, label: 'Calças',},
    {id:5, label: 'Cabeça',},
    {id:6, label: 'Corpo',}
]

export const CategoryScroll = () => {
    const [activeId, setActiveId] = useState(1);

    return (
        <div className="categories flex overflow-x-auto no-scrollbar text-[9pt]">
            {CATEGORIES.map((cat) => {
                const isActive = activeId == cat.id;

                return(
                    <button 
                        key={cat.id}
                        onClick={() => setActiveId(cat.id)}
                        className={`category flex-none p-1.5 px-3 mr-4 rounded-md ${isActive ? 'active' : 'hover:bg-gray-50 text-primary border border-gray-300/50'}`}
                    >{cat.label}</button>
                )
            })}
        </div>
    )
}
