'use client'

import 'react-toastify/ReactToastify.css'
// import 'react-toastify/ReactToastify.min.css'
import { Slide, ToastContainer } from 'react-toastify'

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
