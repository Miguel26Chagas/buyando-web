import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { SlidersHorizontal, ShoppingCart } from "lucide-react"
import { TopUserBar } from "./TopUserBar"
import { CategoryScroll } from "../../services/category"
import { useAuthStore } from "../../stores/authStore"

export const Header = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const [visible, setVisible] = useState(true)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = latest - previous

    if (latest <= 60) {
      setVisible(true)
    } else if (Math.abs(diff) >= 30) {
      setVisible(diff <= 0)
    }
  })

  return (
    <div className="sticky top-0 z-40 w-full bg-white overflow-hidden">
      <header className="w-[90%] max-w-[420px] mx-auto flex flex-col">
        
        <motion.div
          initial="visible"
          animate={visible ? "visible" : "hidden"}
          variants={{
            visible: { 
              height: "auto", 
              opacity: 1,
              transition: {stiffness: 300, damping: 30, duration: 0.3 } 
            },
            hidden: { 
              height: 0, 
              opacity: 0,
              transition: { duration: 0.2, ease: "easeInOut" } 
            }
          }}
        >

          <motion.div
            variants={{
              visible: { y: 0 },
              hidden: { y: -20 } 
            }}
            className="pt-1"
          >
            {isAuthenticated && <TopUserBar />}
            <form className="flex flex-row justify-between items-center mt-3 pb-1">
              <input 
                type="search" 
                placeholder="Buscando..." 
                className="border border-gray-300/50 pl-2 mr-2 p-2 shadow-sm w-[83%] rounded-md"
              />
              <button type="button" className="p-2 px-3.5 bg-primary text-secondary rounded-md shadow-sm">
                <ShoppingCart />
              </button>
            </form>
          </motion.div>
        </motion.div>

        <div className="relative bg-white mb-2 pt-4 pb-3.5 max-w-[420px] m-auto w-full">
          <CategoryScroll />
        </div>
      </header>
    </div>
  )
}