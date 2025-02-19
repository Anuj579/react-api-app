import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { BuildingIcon, EarthIcon, MailIcon, MoveLeftIcon, PhoneIcon } from "lucide-react"

function Details() {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))
  }, [id])

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-teal-400"></div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center px-4">
      <motion.div
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-2xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex sm:items-start flex-col sm:flex-row mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-3xl font-bold mb-2 sm:mb-0 sm:mr-4 ">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              {user.name}
            </h1>
            <p className="text-gray-400">@{user.username}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-300 flex items-center">
              <MailIcon className="w-5 h-5 mr-2 text-teal-400" />
              {user.email}
            </p>
            <p className="text-gray-300 flex items-center mt-2">
              <PhoneIcon className="w-5 h-5 mr-2 text-teal-400" />
              {user.phone}
            </p>
          </div>
          <div>
            <p className="text-gray-300 flex items-center">
              <EarthIcon className="w-5 h-5 mr-2 text-teal-400" />
              {user.website}
            </p>
            <p className="text-gray-300 flex items-center mt-2">
              <BuildingIcon className="w-5 h-5 mr-2 text-teal-400" />
              {user.company.name}
            </p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-2 text-teal-400">Address</h2>
          <p className="text-gray-300">
            {user.address.street}, {user.address.suite}
          </p>
          <p className="text-gray-300">
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>

        <Link
          to="/"
          className="flex gap-2 items-center w-max px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
        >
         <MoveLeftIcon className="h-5 w-5"/> Back to Users
        </Link>
      </motion.div>
    </div>
  )
}

export default Details

