import { Link } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { Menu, X } from "lucide-react"
import { useUIStore } from "@/stores/useUI"

export const NavBar = () => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()

  return (
    <nav className="w-full border-b bg-white shadow-lg border-gray-200 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-bold text-sky-800 hover:text-sky-600 transition-colors"
              onClick={closeMobileMenu}
            >
              CodingIn
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-500 font-medium transition-colors duration-200"
            >
              Home
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="default"
                className="cursor-pointer font-medium transition-colors duration-200"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="secondary"
                className="cursor-pointer font-medium transition-colors duration-200"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 focus:outline-none transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
            ? 'max-h-screen opacity-100 border-t border-gray-200 dark:border-neutral-700'
            : 'max-h-0 opacity-0 overflow-hidden'
            }`}
        >
          <div className="py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className="block text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors duration-200 px-2 py-1"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
              >
                <Button
                  variant="outline"
                  className="w-full cursor-pointer font-medium transition-colors duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
              >
                <Button
                  variant="default"
                  className="w-full cursor-pointer font-medium transition-colors duration-200"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}