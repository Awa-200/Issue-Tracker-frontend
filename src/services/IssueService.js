import  axios  from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/issues';

export const listIssues = ()=> axios.get(REST_API_BASE_URL);

export const createIssue = (issue) => axios.post(REST_API_BASE_URL, issue);

export const getIssue = (issueId) => axios.get(REST_API_BASE_URL + '/' + issueId);

export const updateIssue = (issueId, issue) => axios.put(REST_API_BASE_URL + '/' + issueId, issue);

export const deleteIssue = (issueId, issue) => axios.delete(REST_API_BASE_URL + '/'+ issueId);
