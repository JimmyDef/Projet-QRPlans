'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Slide, ToastContainer, Zoom } from 'react-toastify'

const ClientSideToastContainer = () => (
  <ToastContainer
    position="bottom-right"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition={Slide}
  />
)

export default ClientSideToastContainer
