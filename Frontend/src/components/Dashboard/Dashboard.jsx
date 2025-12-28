import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiCheckCircle, FiClock, FiFolder } from 'react-icons/fi';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, tasksRes, activitiesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/tasks'),
          api.get('/activities'),
        ]);

        setProjects(projectsRes.data);
        setTasks(tasksRes.data);
        setActivities(activitiesRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Derive stats from loaded data (no useEffect needed)
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'Done').length;
  const totalTasks = tasks.length;
  const totalProjects = projects.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pendingPercentage =
    totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0;
  const projectsPercentage = projects.length > 0 ? 100 : 0;

  const recentActivities = activities.slice(0, 10);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3 drop-shadow-lg">
            Dashboard
          </h1>
          <p className="text-gray-700 text-lg font-medium">
            Welcome back! Here&apos;s your Project Overview ✨
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">
                Total Projects
              </p>
              <p className="text-4xl font-bold text-indigo-600">
                {totalProjects}
              </p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-xl">
              <FiFolder className="text-indigo-600" size={28} />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${projectsPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">
                Completed Tasks
              </p>
              <p className="text-4xl font-bold text-indigo-600">
                {completedTasks}
              </p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-xl">
              <FiCheckCircle className="text-indigo-600" size={28} />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">
                Pending Tasks
              </p>
              <p className="text-4xl font-bold text-gray-700">{pendingTasks}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <FiClock className="text-gray-600" size={28} />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-400 transition-all"
              style={{ width: `${pendingPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">
                Completion Rate
              </p>
              <p className="text-4xl font-bold text-indigo-600">
                {completionPercentage}%
              </p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-xl">
              <div className="text-indigo-600 text-2xl font-bold">%</div>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Activities
          </h2>
          <div className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
            Live
          </div>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-smooth border border-gray-200"
              >
                <div className="bg-indigo-100 p-2.5 rounded-xl">
                  <FiCheckCircle className="text-indigo-600" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center">
                    <FiClock className="mr-1" size={12} />
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-500 font-medium">No recent activities</p>
              <p className="text-gray-400 text-sm mt-1">
                Activities will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
