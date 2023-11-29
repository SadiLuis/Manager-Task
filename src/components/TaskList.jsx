import { motion } from 'framer-motion';
import { useTask } from '../context/TaskContext';
import { useState } from 'react';
import { RiPencilLine, RiCheckLine, RiDeleteBinLine } from 'react-icons/ri';

const TaskList = () => {
  const { tasks, deleteTask, updateTask } = useTask();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (taskId, currentText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(currentText);
  };

  const handleSaveEdit = async (taskId) => {
    try {
      await updateTask(taskId, { title: editedTaskText });
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <motion.ul
      className="mt-8 w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center p-4 bg-white text-black rounded-xl shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {}}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </motion.div>

          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
                className="ml-4 text-lg font-medium flex-grow"
              />
              <button
                onClick={() => handleSaveEdit(task.id)}
                className="ml-2 text-green-600 hover:text-green-700 focus:outline-none"
              >
                <RiCheckLine size={20} />
              </button>
            </>
          ) : (
            <>
              <span className={`ml-4 text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
              <button
                onClick={() => handleEdit(task.id, task.title)}
                className="ml-2 text-blue-600 hover:text-blue-700 focus:outline-none"
              >
                <RiPencilLine size={20} />
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="ml-auto text-red-600 hover:text-red-700 focus:outline-none"
              >
                <RiDeleteBinLine size={20} />
              </button>
            </>
          )}
        </li>
      ))}
    </motion.ul>
  );
};

export default TaskList;
