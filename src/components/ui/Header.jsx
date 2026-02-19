import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { SlidersHorizontal } from "lucide-react"
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
    <div className="sticky top-0 z-40 w-full bg-white">
      <header className="w-[90%] max-w-[420px] mx-auto">
        <motion.div
          initial="visible"
          animate={visible ? "visible" : "hidden"}
          variants={{
            visible: { height: "auto", opacity: 1, marginBottom: 0 },
            hidden: { height: 0, opacity: 0, marginBottom: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {isAuthenticated && <TopUserBar />}
          <div className="mt-1">
            <form className='flex flex-row justify-between items-center mt-3 pb-1'>
              <input 
                type="search" 
                placeholder="Buscando..." 
                className="border border-gray-300/50 pl-2 mr-2 p-2 shadow-sm w-[95%] rounded-md"
              />
              <button className="p-2 px-3.5 bg-primary text-secondary rounded-md shadow-sm">
                <SlidersHorizontal />
              </button>
            </form>
          </div>
        </motion.div>

        <div className="mb-2 pt-4 pb-3.5 max-w-[420px] m-auto">
          <CategoryScroll />
        </div>
      </header>
    </div>
  )
}
