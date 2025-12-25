import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import ProjectList from '../components/Projects/ProjectList';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <ProjectList />
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;
