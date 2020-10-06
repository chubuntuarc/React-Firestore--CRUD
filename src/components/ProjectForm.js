import React, { useState, useEffect} from "react";
import { db } from "../firebase";
import M from 'materialize-css';

const ProjectForm = props => {

    //Initial state values.
    const initialStateValues = {
        project_url: '',
        project_name: '',
        project_description: ''
    };

    //Values and function to set the state values.
    const [values, setValues] = useState(initialStateValues);

    //Function to set the state.
    const handleInputChange = e => {
        const {name, value} = e.target;
        //Set the current state + the new values.
        setValues( {...values, [name]: value} );
    }

    //Function for the form submit.
    const handleSubmit = e => {
        e.preventDefault();
        //Send the state data to the function to save values in FB.
        props.addOrEditProject(values);
        //Set the initial state
        setValues({...initialStateValues});
    }

    //Get project by id
    const getProjectById = async id => {
        const project = await db.collection('projects').doc(id).get();
        setValues({...project.data()});
        M.updateTextFields();
    }

    useEffect(() => {
        if (props.currentId === ''){
            setValues({...initialStateValues});
        } else {
            getProjectById(props.currentId);
        }
    }, [props.currentId]);

    return (
        <div className="col s12">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Project Form</span>
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">sort_by_alpha</i>
                                    <input id="icon_prefix" type="text" className="validate" name="project_name" onChange={handleInputChange} value={values.project_name}/>
                                    <label htmlFor="icon_prefix">Project Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">insert_link</i>
                                    <input id="icon_prefix" type="text" className="validate" name="project_url" onChange={handleInputChange} value={values.project_url}/>
                                    <label htmlFor="icon_prefix">Project URL</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">description</i>
                                    <input id="icon_prefix" type="text" className="validate" name="project_description" onChange={handleInputChange} value={values.project_description}/>
                                    <label htmlFor="icon_prefix">Project Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light right col s4" type="submit">
                                    {props.currentId === '' ? 'Save' : 'Update'}
                                    <i className="material-icons right">send</i>
                                </button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectForm;
