import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ProjectForm = ({ project, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    members: [],
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        deadline: project.deadline.split('T')[0],
        members: project.members?.map((m) => m._id) || [],
      });
    }
  }, [project]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberToggle = (userId) => {
    const isSelected = formData.members.includes(userId);
    setFormData({
      ...formData,
      members: isSelected
        ? formData.members.filter((id) => id !== userId)
        : [...formData.members, userId],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (project) {
        await api.put(`/projects/${project._id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-indigo-600">
          <h2 className="text-3xl font-bold text-white">
            {project ? 'Edit Project' : 'Create New Project'}
          </h2>
          <p className="text-white/90 text-sm mt-1">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              📝 Project Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-smooth"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              📄 Description
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-smooth resize-none"
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              📅 Deadline
            </label>
            <input
              type="date"
              name="deadline"
              required
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-smooth"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              👥 Assign Team Members
            </label>
            <div className="border-2 border-gray-300 rounded-xl p-4 max-h-48 overflow-y-auto bg-white/50">
              {users.length > 0 ? (
                users.map((user) => (
                  <label key={user._id} className="flex items-center py-2.5 hover:bg-indigo-50 px-3 rounded-lg cursor-pointer transition-smooth group">
                    <input
                      type="checkbox"
                      checked={formData.members.includes(user._id)}
                      onChange={() => handleMemberToggle(user._id)}
                      className="mr-3 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-smooth">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No team members available</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-smooth"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
