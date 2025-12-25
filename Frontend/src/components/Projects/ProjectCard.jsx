import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiUsers } from 'react-icons/fi';

const ProjectCard = ({ project, onEdit, onDelete, isAdmin }) => {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate(`/projects/${project._id}/tasks`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-indigo-600">{project.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            project.status === 'Active'
              ? 'bg-indigo-100 text-indigo-700'
              : project.status === 'Completed'
              ? 'bg-gray-100 text-gray-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <FiCalendar className="mr-2" size={16} />
          <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FiUsers className="mr-2" size={16} />
          <span>{project.members?.length || 0} members</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleViewTasks}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-smooth"
        >
          View Tasks
        </button>
        
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(project)}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition-smooth"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(project._id)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-smooth"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
