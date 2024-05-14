import React, { useEffect, useState, useRef } from 'react';
import { getIssue } from '../services/IssueService';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'qrcode.react';


const IssueReport = ({ issue, comments }) => {
  return (
    <div>
   
      <h2>Issue Details</h2>
      <table className="table table-success table-striped">
        <tbody>
          <tr>
            <td>Project Name:</td>
            <td>{issue.projectName}</td>
          </tr>
          <tr>
            <td>Issue ID:</td>
            <td>{issue.projectId}</td>
          </tr>
          <tr>
            <td>Issue Type:</td>
            <td>{issue.issueType}</td>
          </tr>
          <tr>
            <td>Priority:</td>
            <td>{issue.priority}</td>
          </tr>
          <tr>
            <td>Reporter:</td>
            <td>{issue.reporter}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{issue.status}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{issue.description}</td>
          </tr>
          <tr>
            <td>Comments:</td>
            <td>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ViewIssueComponent = () => {
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    if (id) {
      fetchIssue(id);
    }
  }, [id]);

  useEffect(() => {
    const storedComments = localStorage.getItem('issueComments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('issueComments', JSON.stringify(comments));
  }, [comments]);

  async function fetchIssue(id) {
    try {
      const response = await getIssue(id);
      setIssue(response.data);
      setComments(response.data.comments || []); // Assuming the backend returns comments along with the issue data
    } catch (error) {
      console.error('Error fetching issue:', error);
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = e.target.comment.value;
    setComments([...comments, newComment]);
    e.target.reset();
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="issue-details" ref={componentRef}>
        <h2>Issue Details</h2>
        <table className="table table-success table-striped">
          <tbody>
            <tr>
              <td>Project Name:</td>
              <td>{issue.projectName}</td>
            </tr>
            <tr>
              <td>Issue ID:</td>
              <td>{issue.projectId}</td>
            </tr>
            <tr>
              <td>Issue Type:</td>
              <td>{issue.issueType}</td>
            </tr>
            <tr>
              <td>Priority:</td>
              <td>{issue.priority}</td>
            </tr>
            <tr>
              <td>Reporter:</td>
              <td>{issue.reporter}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{issue.status}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{issue.description}</td>
            </tr>
          </tbody>
        </table>
       
        <div className='qr-code-container'>
        <p>Issue Details Qr code</p>
        <QRCode value={JSON.stringify(issue)} />
        </div>
        <ul>
        <h2>Comments</h2>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
      <div className="button-container ">
        <button className="btn btn-primary" onClick={handlePrint}>
          Generate Report
        </button>
      </div>
      <br/>
      <div className='comment'>
        
        <form onSubmit={handleAddComment}>
          <textarea name="comment" rows="4" cols="50" placeholder="Add a comment"></textarea>
          <br />
          <button className='btn btn-primary
          ' type="submit">Add Comment</button>
        </form>
      </div>
     
    </div>
  );
};

export default ViewIssueComponent;
