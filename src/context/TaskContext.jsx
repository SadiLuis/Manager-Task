/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/Firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { UserAuth } from "./AuthContext";

const TaskContext = createContext();

export function TaskContextProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const { user } = UserAuth() // Obtén el usuario actual desde el AuthContext
  
    useEffect(() => {
      const fetchTasks = async () => {
        if (user) {
          const userTasksCollection = collection(db, "users", user.uid, "tasks");
          const userTasksSnapshot = await getDocs(userTasksCollection);
          const userTasksData = userTasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTasks(userTasksData);
        }
      };
  
      fetchTasks();
    }, [user]);
  
    const addTask = async (taskData) => {
      if (user) {
        const userTasksCollection = collection(db, "users", user.uid, "tasks");
        const newTaskRef = await addDoc(userTasksCollection, taskData);
        const newTask = { id: newTaskRef.id, ...taskData };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    };

    const updateTask = async (taskId, updatedTaskData) => {
      if (user) {
        const userTasksCollection = collection(db, "users", user.uid, "tasks");
        const taskRef = doc(userTasksCollection, taskId);
    
        try {
          await updateDoc(taskRef, updatedTaskData);
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedTaskData } : task))
          );
        } catch (error) {
          console.error('Error updating task:', error);
        }
      }
    };
    
    const deleteTask = async (taskId) => {
      if (user) {
        const userTasksCollection = collection(db, "users", user.uid, "tasks");
        const taskRef = doc(userTasksCollection, taskId);
    
        try {
          await deleteDoc(taskRef);
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }
    };
    

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  return useContext(TaskContext);
}
