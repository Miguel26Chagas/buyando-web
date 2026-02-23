import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingBag, LogOut, Settings, User, Wallet, Store} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useAuthStore } from "../stores/authStore"

const popoverVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: { duration: 0.15, ease: "easeIn" },
  },
}

export const Thumbnail = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, right: 0 })
  const triggerRef = useRef(null)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()


  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      })
    }
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  if (!user) return null

  const avatarUrl =
    user.profile_photo !== "No Profile Photo"
      ? user.profile_photo
      : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const popover = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            transformOrigin: "top right",
            position: "fixed",
            top: position.top,
            right: position.right,
          }}
          variants={popoverVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-52 z-[9999] rounded-2xl bg-primary shadow-xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
            <p className="text-sm font-semibold text-white truncate">
              {user.name}
            </p>
            {user.email && (
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {user.email}
              </p>
            )}
          </div>
          <div className="py-1.5 border-b border-gray-100 dark:border-zinc-800">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 text-zinc-300 hover:bg-gray-50 hover:bg-zinc-800 transition-colors"
            >
              <ShoppingBag size={16} className="mr-4"/> Minhas Compras
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 text-zinc-300 hover:bg-gray-50 hover:bg-zinc-800 transition-colors"
            >
              <Wallet size={16} className="mr-4"/> Carteira <span className="text-orange-700 text-[8.4pt] ml-1">0.00 Kz</span>
            </Link>
          </div>
          <div className="py-1.5 py-1.5 border-b border-gray-100 dark:border-zinc-800">
            <Link
              to="/user/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 text-zinc-300 hover:bg-gray-50 hover:bg-zinc-800 transition-colors"
            >
              <User size={16} className="mr-4"/> Perfil
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 text-zinc-300 hover:bg-gray-50 hover:bg-zinc-800 transition-colors"
            >
               <Settings size={16} className="mr-4"/> Definições
            </Link>
          </div>
          <div className="py-1.5">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center w-100 px-4 text-sm py-2  font-bold text-cyan-600 hover:bg-zinc-800 transition-colors"
            >
               <Store size={16} className="mr-4"/> Começe a vender
            </button>
          </div>
          <div className="py-1.5 border-t border-gray-100 border-zinc-800">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:bg-red-950 transition-colors"
            >
              <LogOut size={16} className="mr-4 text-zinc-300"/> Terminar sessão
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div ref={triggerRef} className="relative">
      <button
        onClick={handleOpen}
        className="relative rounded-full focus:outline-none"
      >
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-12 h-12 rounded-full border border-gray-400 object-cover shadow-sm"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
      </button>

      {createPortal(popover, document.body)}
    </div>
  )
}