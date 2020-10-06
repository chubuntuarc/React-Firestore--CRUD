import React, {useEffect, useState} from "react";
import ProjectForm from "./ProjectForm";

import {db} from '../firebase';

const Projects = () => {

    const [projects, setProjects] = useState([]);

    //Function to save project data.
    const addOrEditProject = async projectData => {
        await db.collection('projects').doc().set(projectData);
    }

    //Function to delete projects.
    const onDeleteProject = async id => {
        if (window.confirm('Are you sure to delete the project?')){
            await db.collection('projects').doc(id).delete();
        }
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
                            <div className="card" key={project.id}>
                                <div className="col s12">
                                    <div className="card blue-grey darken-1">
                                        <div className="card-content white-text">
                                            <span className="card-title">{project.project_name} <i className="material-icons right red-text" onClick={() => onDeleteProject(project.id)}>delete</i></span>
                                            <p>{project.project_description}</p>
                                        </div>
                                        <div className="card-action">
                                            <a href={project.project_url} target="_blank" rel="noopener noreferrer">Project URL</a>
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