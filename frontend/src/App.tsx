import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Container,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Store'
import { getError } from './utils'
import { ApiError } from './types/ApiError'

import {
  AiFillAndroid,
  AiFillApi,
  AiOutlineBgColors,
  AiOutlineDollar,
  AiOutlineHtml5,
  AiOutlineReddit,
  AiOutlineSave,
  AiOutlineShop,
  AiOutlineSketch,
  AiTwotoneBank,
} from 'react-icons/ai'

import { UserInfo } from './types/UserInfo'
import UserContext from './contexts/UserContext'
import { UserInfoContextType } from './types/UserInfoContext'

import axios from 'axios'
import { Table } from 'antd'

function App() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const userContext = React.createContext<UserInfoContextType | undefined>(
    undefined
  )

  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  useEffect(() => {
    const storedToken = localStorage.getItem('userInfo')
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken)
      setUser(parsedToken)

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${parsedToken.token}`
    }
  }, [])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }
  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }
  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#f8f9fa',
    border: '2px',
    padding: '10px 15px',
  }

  const iconStyle = {
    marginRight: '10px',
  }
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const handleDataSupplierClick = () => {
    setSidebarIsOpen(false)
  }
  const handleDataKategoriClick = () => {
    setSidebarIsOpen(false)
  }
  const handleDataHargaClick = () => {
    setSidebarIsOpen(false)
  }
  const handleDataOutletClick = () => {
    setSidebarIsOpen(false)
  }
  const handleDataUsahaClick = () => {
    setSidebarIsOpen(false)
  }
  const handleDataSatuanClick = () => {
    setSidebarIsOpen(false)
  }
  const handleDataStokClick = () => {
    setSidebarIsOpen(false)
  }
  const handleDataTransaksiClick = () => {
    setSidebarIsOpen(false)
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div
        className="d-flex flex-column vh-100"
        style={{ background: '#f0f0f0' }}
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header style={{ background: '#f0f0f0' }}>
          <Navbar
            className="d-flex flex-column align-items-stretch p-3 pb-0 mb-3"
            bg="dark"
            variant="dark"
            expand="lg"
          >
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  flex: '1',

                  flexBasis: '40%',
                  textAlign: 'right',
                }}
              >
                <div className="d-flex">
                  {/* Tombol Sidebar */}
                  <Link
                    to="#"
                    className="nav-link header-link p-1"
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  >
                    <i className="fas fa-bars"></i>
                  </Link>
                  {/* <Link
                    className="nav-link header-link p-1 px-3"
                    to={`/finance/invoices`}
                  >
                    Finance
                  </Link>
                  <Link className="nav-link header-link p-1 px-3" to={`/banks`}>
                    Kas Penjualan
                  </Link>
                  <Link
                    className="nav-link header-link p-1 px-3"
                    to={`/finance/expenses`}
                  >
                    Expenses
                  </Link>
                  <Link
                    className="nav-link header-link p-1 px-3"
                    to={`/mentahFI`}
                  >
                    Mentah Invoice
                  </Link>
                  <Link className="nav-link header-link p-1 px-3" to={`/sss`}>
                    Lengkap
                  </Link>
                  <Link className="nav-link header-link p-1 px-3" to={`/aat`}>
                    AAT
                  </Link>
                  <Link
                    className="nav-link header-link p-1 px-3"
                    to={`/kaspenjualanpisah`}
                  >
                    kaspenjualanpisah
                  </Link> */}
                  <Link
                    className="nav-link header-link p-1 px-3"
                    to={`/stokgudang`}
                  >
                    Stok Outlet
                  </Link>
                  <Link
                    className="nav-link header-link p-1 px-3"
                    to={`/hargabarang`}
                  >
                    Jenis Harga
                  </Link>
                </div>
              </div>
              <div
                style={{
                  flex: '1',

                  flexBasis: '40%',
                  textAlign: 'right',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <h1 style={{ fontSize: '2.5rem' }}></h1>
                </div>
              </div>
              <div
                style={{
                  flex: '1', // Lebar fleks 2 kali lebih besar

                  flexBasis: '40%',
                  textAlign: 'right',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <Navbar.Collapse>
                    <Nav className="w-100 justify-content-end">
                      <Link
                        to="#"
                        className="nav-link header-link"
                        onClick={switchModeHandler}
                      >
                        <i
                          className={
                            mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'
                          }
                        ></i>{' '}
                        {mode === 'light' ? 'Light' : 'Dark'}
                      </Link>
                      {userInfo ? (
                        <NavDropdown
                          className="header-link"
                          title={` ${userInfo.name}`}
                        >
                          <LinkContainer to="/profile">
                            <NavDropdown.Item>User Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/orderhistory">
                            <NavDropdown.Item>Order History</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <Link
                            className="dropdown-item"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            {' '}
                            Sign Out{' '}
                          </Link>
                        </NavDropdown>
                      ) : (
                        <NavDropdown
                          className="header-link"
                          title={`Hello, sign in`}
                        >
                          {/* <LinkContainer to="/signin">
                            <NavDropdown.Item>Sign In</NavDropdown.Item>
                          </LinkContainer> */}
                          //{' '}
                        </NavDropdown>
                      )}
                      {/* <Link to="/orderhistory" className="nav-link header-link">
                        Orders
                      </Link> */}
                      {/* <Link to="/cart" className="nav-link header-link p-0">
                        {
                          <span className="cart-badge">
                            {cart.cartItems.reduce(
                              (a: any, c: any) => a + c.quantity,
                              0
                            )}
                          </span>
                        }
                        <svg
                          fill="#ffffff"
                          viewBox="130 150 200 300"
                          width="40px"
                          height="40px"
                        >
                          <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z" />
                        </svg>
                        <span>Cart</span>
                      </Link> */}
                    </Nav>
                  </Navbar.Collapse>
                </div>
              </div>
            </div>
          </Navbar>
        </header>
        {/* kddfkmg000000000000000000000000000000 */}
        <div style={{ display: 'flex', marginBottom: 20 }}>
          <div
            style={{
              flex: '1', // Lebar fleks 2 kali lebih besar
              border: '1px solid white',
              flexBasis: '40%',
              textAlign: 'right',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: '2.5rem' }}></h1>
            </div>
          </div>
          <div
            style={{
              flex: '1', // Lebar fleks 2 kali lebih besar
              border: '1px solid white',
              flexBasis: '40%',
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: '1.5rem' }}></h1>
            </div>
          </div>
        </div>

        {/* lsjvsidklmbl/000000000000000000000000000000000000000 */}

        {/* Backdrop Sidebar */}
        {sidebarIsOpen && (
          <div
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            className="side-navbar-backdrop"
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          {/* <ListGroup variant="flush">
            <ListGroup.Item action className="side-navbar-user">
              <LinkContainer
                to={userInfo ? `/profile` : `/signin`}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <span>
                  {userInfo ? `Hello, ${userInfo.name}` : `Hello, sign in`}
                </span>
              </LinkContainer>
            </ListGroup.Item> */}
          {/* <ListGroup.Item style={listItemStyle}>
              <div>
                <Button
                  variant={mode}
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  <AiTwotoneBank size={25} style={iconStyle} />
                </Button>
              </div> */}
          {/* </ListGroup.Item>

            {/* <ListGroup.Item style={listItemStyle}>
              <AiOutlineBgColors size={20} style={iconStyle} />
              <LinkContainer to="/product" onClick={handleDataSupplierClick}>
                <NavDropdown.Item>Data Product</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>
            <ListGroup.Item style={listItemStyle}>
              <AiOutlineBgColors size={20} style={iconStyle} />
              <LinkContainer to="/multi" onClick={handleDataSupplierClick}>
                <NavDropdown.Item>Multi Harga</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>
            <ListGroup.Item style={listItemStyle}>
              <AiOutlineBgColors size={20} style={iconStyle} />
              <LinkContainer to="/mutasi" onClick={handleDataSupplierClick}>
                <NavDropdown.Item>Data Mutasi</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            {/* Data Supplier */}
          {/* <ListGroup.Item style={listItemStyle}>
              <AiOutlineBgColors size={20} style={iconStyle} />
              <LinkContainer to="/supplier" onClick={handleDataSupplierClick}>
                <NavDropdown.Item>Data Supplier</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiFillApi size={20} style={iconStyle} />
              <LinkContainer to="/kind" onClick={handleDataKategoriClick}>
                <NavDropdown.Item>Kategori</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiOutlineReddit size={20} style={iconStyle} />
              <LinkContainer to="/pelanggan" onClick={handleDataKategoriClick}>
                <NavDropdown.Item>Pelanggan</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiOutlineDollar size={20} style={iconStyle} />
              <LinkContainer to="/harga" onClick={handleDataHargaClick}>
                <NavDropdown.Item>Harga</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiOutlineSave size={20} style={iconStyle} />
              <LinkContainer to="/outlet" onClick={handleDataOutletClick}>
                <NavDropdown.Item>Data Telolet</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiFillAndroid size={20} style={iconStyle} />
              <LinkContainer to="/usaha" onClick={handleDataUsahaClick}>
                <NavDropdown.Item>Data Usaha</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiOutlineHtml5 size={20} style={iconStyle} />
              <LinkContainer to="/satuan" onClick={handleDataSatuanClick}>
                <NavDropdown.Item>Data Satuan</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiOutlineSketch size={20} style={iconStyle} />
              <LinkContainer to="/stok" onClick={handleDataStokClick}>
                <NavDropdown.Item>Data Stok</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiOutlineShop size={20} style={iconStyle} />
              <LinkContainer to="/transaksi" onClick={handleDataTransaksiClick}>
                <NavDropdown.Item>Data Transaksi</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item style={listItemStyle}>
              <AiOutlineShop size={20} style={iconStyle} />
              <LinkContainer to="/pos" onClick={handleDataTransaksiClick}>
                <NavDropdown.Item>pos</NavDropdown.Item>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup> */}
          <ListGroup.Item style={listItemStyle}>
            <AiOutlineShop size={20} style={iconStyle} />
            <LinkContainer to="/pokemon" onClick={handleDataTransaksiClick}>
              <NavDropdown.Item>Product</NavDropdown.Item>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item style={listItemStyle}>
            <AiOutlineShop size={20} style={iconStyle} />
            <LinkContainer to="/banks" onClick={handleDataTransaksiClick}>
              <NavDropdown.Item>Banks</NavDropdown.Item>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item style={listItemStyle}>
            <AiOutlineShop size={20} style={iconStyle} />
            <LinkContainer
              to="/finance/invoices"
              onClick={handleDataTransaksiClick}
            >
              <NavDropdown.Item>Finance Invoices</NavDropdown.Item>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item style={listItemStyle}>
            <AiOutlineShop size={20} style={iconStyle} />
            <LinkContainer to="/mentahFI" onClick={handleDataTransaksiClick}>
              <NavDropdown.Item>Mentah Invoice</NavDropdown.Item>
            </LinkContainer>
          </ListGroup.Item>
        </div>

        {/* Main Content */}
        <main style={{ background: '#f2f4f8' }}>
          <Container className="mt-6">
            <Outlet />
          </Container>
        </main>
        {/* <PrintComponent /> */}

        {/* Footer */}
        {/* <footer>
        <div className="text-center">Iqra 'Bacalah atas nama'</div>
      </footer> */}
      </div>
    </UserContext.Provider>
  )
}

export default App
