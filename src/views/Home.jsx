import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();

  const logout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <header className="flex items-center justify-between p-6 bg-white rounded-b-xl shadow-lg">
        <div className="flex items-center space-x-8">
          <img
            src="/manager.jpg"
            alt="Logo"
            className="h-1/2 w-16 rounded-xl"
          />
          <h2 className="text-2xl font-semibold text-black">
            Welcome, {user ? user.email : "User"}
          </h2>
        </div>
        <motion.button
          onClick={logout}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Log Out
        </motion.button>
      </header>
      <main className="flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-extrabold text-white underline decoration-4 decoration-gray-950">
          Manager
        </h1>
        <small className="font-thin"> We are here to help you! </small>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};

export default Home;
