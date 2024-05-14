import React, { useEffect, useState, useMemo } from 'react';
import { deleteIssue, listIssues } from '../services/IssueService';
import { useNavigate } from 'react-router-dom';

const ListComponents = () => {
  const [issues, setIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    getAllIssues();
  }, []);

  useEffect(() => {
    filterIssues();
  }, [searchQuery, issues]);

  async function getAllIssues() {
    try {
      const response = await listIssues();
      setIssues(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issues:', error);
      setLoading(false);
    }
  }

  function addNewIssue() {
    navigator('/add-issue');
  }

  function updateIssue(id) {
    navigator(`/edit-issue/${id}`);
  }

  async function removeIssue(id) {
    console.log(id);
    try {
      await deleteIssue(id);
      getAllIssues();
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  }

  function viewIssue(id) {
    navigator(`/view-issue/${id}`);
  }

  function filterIssues() {
    if (!searchQuery) {
      setFilteredIssues(issues);
    } else {
      const filtered = issues.filter(
        (issue) =>
          issue.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.reporter.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredIssues(filtered);
    }
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  const memoizedFilteredIssues = useMemo(() => {
    return filteredIssues;
  }, [filteredIssues]);

  const truncateDescription = (description) => {
    const MAX_WORDS = 5; // maximum number of words to display 
    const words = description.split(' ');
    if (words.length > MAX_WORDS) {
      return `${words.slice(0, MAX_WORDS).join(' ')}...`; // Truncate the description
    }
    return description;
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Issues</h2>

      <input
        className="form-control"
        type="search"
        placeholder="Search by Project ID, Name, Type or Reporter"
        value={searchQuery}
        onChange={handleSearch}
      />
      <br />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-success table-striped table-hover">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Project Name</th>
              <th>Issue Type</th>
              <th>Priority</th>
              <th>Reporter</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memoizedFilteredIssues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.projectId}</td>
                <td>{issue.projectName}</td>
                <td>{issue.issueType}</td>
                <td>{issue.priority}</td>
                <td>{issue.reporter}</td>
                <td>{issue.status}</td>
                <td>{truncateDescription(issue.description)}</td> {/* Truncate description */}
                <td>
                  <button className="btn btn-info" onClick={() => updateIssue(issue.id)}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeIssue(issue.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => viewIssue(issue.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListComponents;
