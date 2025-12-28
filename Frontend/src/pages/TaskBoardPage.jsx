import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import KanbanBoard from '../components/Tasks/KanbanBoard';
import ActivityLog from '../components/ActivityLog/ActivityLog';
import api from '../utils/api';
import { FiArrowLeft } from 'react-icons/fi';

const TaskBoardPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Failed to load project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-lg font-semibold">
                Loading project...
              </p>
            </div>
          ) : project ? (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/projects')}
                    className="bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition-smooth"
                  >
                    <FiArrowLeft size={20} />
                  </button>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-indigo-600">
                      {project.title}
                    </h1>
                    <p className="text-gray-600 mt-2">{project.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              <KanbanBoard projectId={projectId} />

              <ActivityLog projectId={projectId} />
            </div>
          ) : (
            <div className="bg-white p-16 rounded-xl shadow-md text-center border border-gray-200">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-600 text-4xl">⚠️</span>
              </div>
              <p className="text-gray-700 text-xl font-semibold mb-2">
                Project not found
              </p>
              <p className="text-gray-500 mb-6">
                The project you&apos;re looking for doesn&apos;t exist
              </p>
              <button
                onClick={() => navigate('/projects')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-smooth"
              >
                Back to Projects
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TaskBoardPage;
