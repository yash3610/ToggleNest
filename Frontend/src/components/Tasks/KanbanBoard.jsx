import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import api from '../../utils/api';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState({
    'To Do': [],
    'In Progress': [],
    'Done': [],
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?project=${projectId}`);
      const tasksByStatus = {
        'To Do': [],
        'In Progress': [],
        'Done': [],
      };

      response.data.forEach((task) => {
        if (tasksByStatus[task.status]) {
          tasksByStatus[task.status].push(task);
        }
      });

      setTasks(tasksByStatus);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // No movement
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const movedTask = sourceColumn[source.index];

    // Remove from source
    const newSourceTasks = Array.from(sourceColumn);
    newSourceTasks.splice(source.index, 1);

    // Add to destination
    const newDestTasks = Array.from(destColumn);
    newDestTasks.splice(destination.index, 0, movedTask);

    // Update local state immediately for smooth UX
    setTasks({
      ...tasks,
      [source.droppableId]: newSourceTasks,
      [destination.droppableId]: newDestTasks,
    });

    // Update task status in backend
    try {
      await api.put(`/tasks/${draggableId}`, {
        status: destination.droppableId,
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      // Revert on error
      fetchTasks();
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedTask(null);
  };

  const handleFormSuccess = () => {
    fetchTasks();
    handleFormClose();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 animate-fade-in">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg font-semibold">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Task Board</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-smooth shadow-md"
        >
          + Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tasks).map(([status, taskList]) => {
            
            return (
            <div key={status} className="bg-white rounded-xl p-5 border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">{status}</h3>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                  {taskList.length}
                </span>
              </div>

              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[500px] transition-smooth rounded-lg ${
                      snapshot.isDraggingOver ? 'bg-indigo-50 border-2 border-indigo-300' : 'bg-gray-50'
                    }`}
                  >
                    {taskList.length > 0 ? (
                      taskList.map((task, index) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          index={index}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        No tasks
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            );
          })}
        </div>
      </DragDropContext>

      {showForm && (
        <TaskForm
          task={selectedTask}
          projectId={projectId}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
