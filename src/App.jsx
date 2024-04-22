import { NewProject } from "./components/NewProject";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { NoProjectSelected } from "./components/NoProjectSelected";
import { useState } from "react";

function App() {
  const [projectsState, setProjectSate] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleAddProject() {
    setProjectSate((prevProjectsState) => {
      return { ...prevProjectsState, selectedProjectId: null };
    });
  }

  let content;

  if (projectsState.selectedProjectId === undefined)
    content = <NoProjectSelected onAddProject={handleAddProject} />;
  else if (projectsState.selectedProjectId === null) content = <NewProject />;
  
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onAddProject={handleAddProject} />
      {content}
    </main>
  );
}

export default App;
