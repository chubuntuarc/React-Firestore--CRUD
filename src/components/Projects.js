import React from "react";
import ProjectForm from "./ProjectForm";

import {db} from '../firebase';

const Projects = () => {

    //Function to save project data.
    const addOrEditProject = async projectData => {
        await db.collection('projects').doc().set(projectData);
        console.log('Project Created');
    }

    return (
        <div>
            <ProjectForm addOrEditProject={addOrEditProject} />
            <h1>Projects</h1>
        </div>
    )
}

export default Projects;