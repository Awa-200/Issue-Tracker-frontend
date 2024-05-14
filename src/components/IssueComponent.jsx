import React,{ useEffect, useState} from 'react'
import { createIssue, getIssue, updateIssue } from '../services/IssueService'
import {useNavigate, useParams} from 'react-router-dom'


const IssueComponent = () => {

const [projectId, setProjectId] = useState('')
const [projectName, setProjectName] = useState('')
const [issueType, setIssueType] = useState('')
const [priority, setPriority] = useState('')
const [reporter, setReporter] = useState('')
const [status, setStatus] = useState('')
const [description, SetDescription] = useState('')

const [errors, setErrors] = useState({
    projectId:'',
    projectName:'',
    issueType:'',
    priority:'',
    reporter:'',
    status:'',
    description:''


})

const {id} = useParams();

const navigator = useNavigate();

useEffect(() => {
    if(id){
        getIssue(id).then((response) => {
            setProjectId(response.data.projectId);
            setProjectName(response.data.projectName);
            setIssueType(response.data.issueType);
            setPriority(response.data.priority);
            setReporter(response.data.reporter);
            setStatus(response.data.status);
            SetDescription(response.data.description);

        }).catch(error => {
            console.error(error);
        })
    }
}, [id])


function saveOrUpdateIssue(e){
    e.preventDefault();

    if(validateForm()){

        const issue = {projectId, projectName, issueType, priority, reporter,status, description}
        console.log(issue)

        if(id){
            updateIssue(id,issue).then ((response) =>{
                console.log(response.data);
                navigator('/issues');
            }).catch(error => {
                console.error(error);
            })
        }else{
            createIssue(issue).then((response) => {
                console.log(response.data);
                navigator('/issues')
            }).catch(error =>{
                console.error(error);
            })
        }
    }
}

function validateForm(){
    let valid = true;

    const errorsCopy = {... errors};

    if(projectId.trim()){
        errorsCopy.projectId = '';
    }else{
        errorsCopy.projectId = 'Issue Id is required';
        valid = false;
    }

    if (projectName.trim()){
        errorsCopy.projectName = '';
    }else{
        errorsCopy.projectName = 'Project name is required';
        valid= false;
    }

    if (issueType.trim()){
        errorsCopy.issueType = '';
    }else{
        errorsCopy.issueType = 'issueType is required';
        valid= false;
    }

    if (priority.trim()){
        errorsCopy.priority = '';
    }else{
        errorsCopy.priority = 'priority is required';
        valid= false;
    }

    if (reporter.trim()){
        errorsCopy.reporter = '';
    }else{
        errorsCopy.reporter = 'reporter name is required';
        valid= false;
    }

    if (status.trim()){
        errorsCopy.status = '';
    }else{
        errorsCopy.status = 'Project status is required';
        valid= false;
    }

    if (description.trim()){
        errorsCopy.description = '';
    }else{
        errorsCopy.description = 'description is required';
        valid= false;
    }

    setErrors(errorsCopy);

    return valid;
}

function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Issue</h2>
    }else{
        return <h2 className='text-center'>Add Issue</h2>
    }

}

  return (
    <div className='containerr'>
        <br /><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Project ID:</label>
                        <input
                            type="text"
                            placeholder='Enter Issue ID'
                            name='projectId'
                            value={projectId}
                            className={`form-control ${ errors.projectId ? 'is-invalid': ''} `}
                            onChange={(e) => setProjectId(e.target.value)}
                        
                        ></input>
                        {errors.projectId && <div className='invalid-feedback'>{errors.projectId}</div>}

                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Project Name:</label>
                        <input
                            type="text"
                            placeholder='Enter Project Name '
                            name='projectName'
                            value={projectName}
                            className={`form-control ${ errors.projectName ? 'is-invalid': ''} `}
                            onChange={(e) =>setProjectName(e.target.value)}
                        
                        ></input>
                        {errors.projectName && <div className='invalid-feedback'>{errors.projectName}</div>}

                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Issue Type:</label>
                        <input
                            type="text"
                            placeholder='Enter Issue Type'
                            name='issueType'
                            value={issueType}
                            className={`form-control ${ errors.issueType ? 'is-invalid': ''} `}
                            onChange={(e) =>setIssueType(e.target.value)}
                        
                        ></input>
                        {errors.issueType && <div className='invalid-feedback'>{errors.issueType}</div>}

                    </div>
                    <div className='form-group mb-2'>
                         <label className='form-label'>Priority: </label>
                          <select
                           name='priority'
                          value={priority}
                          className={`form-control ${errors.priority ? 'is-invalid' : ''}`}
                          onChange={(e) => setPriority(e.target.value)}
                             >
                          <option value="">Select Priority</option>
                          <option value="low">Low</option>
                             <option value="medium">Medium</option>
                             <option value="high">High</option>
                             </select>
                             {errors.priority && <div className='invalid-feedback'>{errors.priority}</div>}
                        </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Reporter:</label>
                        <input
                            type="text"
                            placeholder='Enter Reporter Name'
                            name='reporter'
                            value={reporter}
                            className={`form-control ${ errors.reporter ? 'is-invalid': ''} `}
                            onChange={(e) =>setReporter(e.target.value)}
                        
                        ></input>
                        {errors.reporter && <div className='invalid-feedback'>{errors.reporter}</div>}

                    </div>
                    <div className='form-group mb-2'>
                            <label className='form-label'>Status:</label>
                            <select
                                name='status'
                                value={status}
                                className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="pending">Pending</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                            {errors.status && <div className='invalid-feedback'>{errors.status}</div>}
                        </div>

                    <div className='form-group mb-2'>
                        <label className='form-label'>Description:</label>
                        <input
                            type="text"
                            placeholder='Enter Description about Issue'
                            name='description'
                            value={description}
                            className={`form-control ${ errors.description ? 'is-invalid': ''} `}
                            onChange={(e) =>SetDescription(e.target.value)}
                        
                        ></input>
                        {errors.description && <div className='invalid-feedback'>{errors.description}</div>}

                    </div>
                    <br/>
                    <button className='btn btn-success' onClick={saveOrUpdateIssue}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IssueComponent