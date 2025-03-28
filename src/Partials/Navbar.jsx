import React from 'react'
import InputField from '../Components/InputField'
import Button from '../Components/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setUser } from '../store/reducers/userSlice'

// Navbar with search and logout
const Navbar = ({ searchTerm, setSearchTerm }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Logout handler
    const handleLogout = () => {
        sessionStorage.clear()
        dispatch(setUser(null))
        navigate("/")
        toast.success("Logged out successfully")
    }

    return (
        <div className="w-full flex flex-col sm:flex-row items-center p-5 lg:px-20 xl:px-32 shadow justify-between mb-6 bg-gray-100 gap-4">
            {/* Title */}
            <h1 className="text-3xl font-semibold tracking-tight text-sky-600">Meet ReqRes Users!</h1>
            
            {/* Search & logout */}
            <div className="flex w-full sm:w-1/3 items-center gap-2">
                <InputField
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users..."
                    icon={<i className="ri-search-line"></i>}
                />
                <Button 
                    onClick={handleLogout} 
                    variant="danger" 
                    icon="ri-login-box-line"
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Navbar