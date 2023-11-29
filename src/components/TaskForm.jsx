import { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { motion } from 'framer-motion';
import { RiCheckboxBlankLine } from 'react-icons/ri';

const TaskForm = () => {
  const { addTask } = useTask();
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.trim()) {
      addTask({ title: newTask });
      setNewTask('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-4 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="flex items-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border border-red-500 shadow-sm shadow-black rounded flex-grow"
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-indigo-600 hover:bg-purple-600 hover:scale-110 duration-700 text-white rounded-md flex items-center"
        >
          <RiCheckboxBlankLine size={20} className="mr-2" />
          Add Task
        </button>
      </div>
    </motion.form>
  );
};

export default TaskForm;
