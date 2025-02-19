import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function Home() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
  }, [])

  if (users.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-teal-400"></div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <motion.h1
          className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          User Explorer
        </motion.h1>
        <motion.div
          className="relative max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-4 pr-12 text-gray-100 rounded-full outline-none border-2 border-gray-600 focus:border-teal-400 transition-all duration-300"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {users
            .filter((user) => user.name.toLowerCase().includes(search))
            .map((user) => (
              <Link to={`/user/${user.id}`}>
                <motion.div key={user.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
                  <div className="flex flex-col h-full p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                        {user.name[0]}
                      </div>
                      <div className="ml-4">
                        <h2 className="font-semibold text-gray-100 text-base sm:text-xl">{user.name}</h2>
                        <p className="text-gray-400 text-sm sm:text-base">{user.email}</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                      <span className="font-semibold text-teal-400">Company:</span> {user.company.name}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home

