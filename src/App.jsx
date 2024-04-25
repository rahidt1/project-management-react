import { NewProject } from "./components/NewProject";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { NoProjectSelected } from "./components/NoProjectSelected";
import { useState } from "react";
import { SelectedProject } from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectSate] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  // Initially when no project is created or no project is selected
  function handleStartAddProject() {
    setProjectSate((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: null };
    });
  }

  // Add project
  function handleAddProject(projectData) {
    setProjectSate((prevProjectsState) => {
      const newProject = { ...projectData, id: Math.random() };

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  }

  // Cancel
  function handleCancelAddProject() {
    setProjectSate((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: undefined };
    });
  }

  // Show selected project
  function handleSelectProject(id) {
    setProjectSate((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: id };
    });
  }

  // Selected project
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = <SelectedProject project={selectedProject} />;

  // undefined -> no project is selected, show fallback content
  // null -> add project, show input form
  if (projectsState.selectedProjectId === undefined)
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  else if (projectsState.selectedProjectId === null)
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancelAddProject={handleCancelAddProject}
      />
    );

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
