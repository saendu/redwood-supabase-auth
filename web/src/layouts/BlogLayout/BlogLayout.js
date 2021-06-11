import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useContext } from 'react'
import { LoginModalContext } from 'src/lib/LoginModalContext'
import LoginModal from 'src/components/LoginModal'

const BlogLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser, hasRole } = useAuth()

  const [modalState, setModalState] = useContext(LoginModalContext)

  const handleModal = () => {
    if (isAuthenticated && modalState === 'CLOSED') {
      logOut()
    }
    if (!isAuthenticated && modalState === 'CLOSED') {
      setModalState('OPEN')
    }
  }

  //console.log(modalState)

  return (
    <>
      <header className="relative flex justify-between items-center py-4 px-8 bg-blue-700 text-white">
        <h1 className="text-5xl font-semibold tracking-tight">
          <Link
            className="text-blue-400 hover:text-blue-100 transition duration-100"
            to={routes.home()}
          >
            Skateboard Blog
          </Link>
        </h1>
        <nav>
          <ul className="relative flex items-center font-light">
            <li>
              <Link
                className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                to={routes.about()}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                to={routes.contact()}
              >
                Contact
              </Link>
            </li>
            {hasRole(['admin']) && (
              <li>
                <Link
                  className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                  to={routes.weather()}
                >
                  Weather
                </Link>
              </li>
            )}
            <li>
              <button
                className="py-2 px-4 hover:bg-blue-600 transition duration-100 rounded"
                href="#"
                onClick={handleModal}
              >
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </button>
            </li>
          </ul>
          {isAuthenticated && (
            <div className="absolute bottom-1 right-0 mr-12 text-xs text-blue-300">
              {currentUser.email}
            </div>
          )}
        </nav>
      </header>

      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="text-blue-400 uppercase font-semibold tracking-widest">Lorem ipsum</span>
          <h2 className="my-5 text-4xl font-bold font-heading text-blue-800">Lorem ipsum dolor sit amet consectutar</h2>
          <p className="text-lg text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci.</p>
        </div>
        <div className="flex flex-wrap -mx-4 -mb-20">

          {children}


        </div>
      </div>

      {modalState === 'OPEN' && <LoginModal />}
    </>
  )
}

export default BlogLayout
