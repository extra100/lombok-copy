import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StoreProvider } from './Store'
import SignupPage from './pages/SignupPage'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import SigninPage from './pages/SinginPage'
import FormAlamat from './pages/alamat/FormAlamat'
import Pokemon from './pages/product/Pokemon'
import ProtectedRoute from './components/protectedRoute'

import FinanceInvoices from './pages/financeInvoices/FinanceInvoices'
import BankTrans from './pages/banks/BankTrans'

import Aneh from './pages/complicatedTable'
import Banks from './pages/banks/Banks'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/alamat" element={<FormAlamat />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/finance/invoices" element={<FinanceInvoices />} />
        <Route path="/bankTrans" element={<BankTrans />} />
        <Route path="/table" element={<Aneh />} />
      </Route>
    </Route>
  )
)

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
)
