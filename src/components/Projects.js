import React, {useEffect, useState} from "react";
import ProjectForm from "./ProjectForm";

import {db} from '../firebase';

const Projects = () => {

    const [projects, setProjects] = useState([]);

    //Function to save project data.
    const addOrEditProject = async projectData => {
        await db.collection('projects').doc().set(projectData);
    }

    //Load the projects on state changes.
    const getProjects = async () => {
        db.collection('projects').onSnapshot(snap => {
            const docs = [];
            snap.forEach(project => {
                docs.push({ ...project.data(), id: project.id});
            });
            setProjects(docs);
        });
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div>
            <ProjectForm addOrEditProject={addOrEditProject} />
            <div className="col s12">
                {projects.map(project => {
                    if (project.project_name){
                        return (
                            <div className="card">
                                <div class="col s12">
                                    <div class="card blue-grey darken-1">
                                        <div class="card-content white-text">
                                            <span class="card-title">{project.project_name}</span>
                                            <p>{project.project_description}</p>
                                        </div>
                                        <div class="card-action">
                                            <a href={project.project_url}>Project URL</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default Projects;