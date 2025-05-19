import { useContext } from 'react'
import ToastContext from '@/hooks/context/ToastContext'

const useToastContext = () => {
  return useContext(ToastContext)
}

export default useToastContext
