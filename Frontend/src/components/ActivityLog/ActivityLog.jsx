import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const ActivityLog = ({ projectId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchActivities = async () => {
    try {
      const url = projectId ? `/activities?project=${projectId}` : '/activities';
      const response = await api.get(url);
      setActivities(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-500">Loading activities...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Activity Log</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-smooth border-l-4 border-indigo-500"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(activity.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                {activity.user && (
                  <p className="text-xs text-gray-500 mt-1">By: {activity.user.name}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No activities yet</p>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
