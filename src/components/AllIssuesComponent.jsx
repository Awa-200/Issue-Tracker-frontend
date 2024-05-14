import React, { useEffect, useState } from 'react';
import { listIssues } from '../services/IssueService';

const AllIssuesComponent = () => {
  const [issues, setIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIssues, setFilteredIssues] = useState([]);

  useEffect(() => {
    fetchAllIssues();
  }, []);

  async function fetchAllIssues() {
    try {
      const response = await listIssues();
      setIssues(response.data);
      setFilteredIssues(response.data); // filtered issues to all issues
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  }

  useEffect(() => {
    filterIssues();
  }, [searchQuery, issues]);

  function filterIssues() {
    if (!searchQuery) {
      setFilteredIssues(issues); // If search query is empty, show all issues
    } else {
      const filtered = issues.filter((issue) =>
        issue.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredIssues(filtered);
    }
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="container">
      <h2 className="text-center">All Issues</h2>
      <div className="mb-3">
        <input
          className="form-control"
          type="search"
          placeholder="Search by Project Name, Priority, Reporter, or Status"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div></div>
      <div className="row">
  {filteredIssues.map((issue) => (
    <div key={issue.id} className="col" style={{ maxWidth: "18rem", height: "300px" }}>
      <div className="card bg-info">
        <div className="card-body">
          <h6 className="card-title font-weight-bold">Project Name: {issue.projectName}</h6>
          <p className="card-text">Issue Type: {issue.issueType}</p>
          <p className="card-text">Priority: {issue.priority}</p>
          <p className="card-text">Reporter: {issue.reporter}</p>
          <p className="card-text">Status: {issue.status}</p>
          <a href={`/view-issue/${issue.id}`} className="btn btn-primary">View Issue Details</a>
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default AllIssuesComponent;
