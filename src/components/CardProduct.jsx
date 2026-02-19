import { useState, useEffect } from "react"
import { Store, ShoppingCart} from 'lucide-react'

export const CardProduct = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController();
        let urlLocal = 'http://localhost:8000' 
        let urlTunnel = 'https://buyandoback.share.zrok.io'
        let url = urlTunnel || urlLocal

        const get_data = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${url}/product/all`, {
                    signal: controller.signal
                })

                if (!response.ok) {
                    throw new Error('Falha ao buscar')
                }
                const result = await response.json()
                console.log(result)
                setData(result)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }
        get_data()
        return () => controller.abort();
    }, [])

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="grid grid-cols-1 gap-4 xsm:grid-cols-2 md:gap-6 lg:grid-cols-3 w-[90%] xl:grid-cols-4 max-w-[420px] m-auto">
            {data.map((product) => (
                <div key={product.id} className="box-cards mb-3 flex w-full flex-col overflow-hidden bg-card  m-auto">
                    <div className="relative rounded-2xl  shadow-[0_0_3px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-300/50">
                        <img src={product.photo_urls[0].photo_url} alt={product.name} className="h-full w-full  transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="name-product truncate font-extrabold mt-2">{product.name}</h3>
                        <p className="text-gray-500 text-[9pt] line-clamp-2 mb-2">{product.detail}</p>
                    </div>
                    <div className="flex mb-2 justify-start items-center price text-[10pt] whitespace-nowrap font-extrabold">
                        <span className="font-bold text-[13pt]">{product.price} KZ</span>
                        <Store className="w-[14px] mx-1.5 ml-[18px]" />
                        <span className="truncate text-blue-400 py-2 cursor-pointer">{product.seller.seller_name}</span>
                    </div>
                    <button className="flex justify-center items-center p-3 px-3.5 bg-primary mb-3 w-full text-secondary rounded-lg shadow-[0_0_3px_rgba(0,0,0,0.3)] m"><ShoppingCart className="mr-2 w-[18px]" /> Comprar</button>
                </div>
            ))}
        </div>
    )
}