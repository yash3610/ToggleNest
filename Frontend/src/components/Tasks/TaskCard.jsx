import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiClock, FiUser } from 'react-icons/fi';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-lg shadow-md mb-3 border transition-smooth ${
            snapshot.isDragging ? 'shadow-xl border-indigo-400 scale-105' : 'border-gray-200 hover:shadow-lg'
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900 text-sm">{task.title}</h4>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>

          <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>

          <div className="space-y-2 mb-3">
            <div className="flex items-center text-xs text-gray-500">
              <FiClock className="mr-2" size={14} />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            {task.assignedTo && (
              <div className="flex items-center text-xs text-gray-500">
                <FiUser className="mr-2" size={14} />
                <span>{task.assignedTo.name}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold transition-smooth"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
