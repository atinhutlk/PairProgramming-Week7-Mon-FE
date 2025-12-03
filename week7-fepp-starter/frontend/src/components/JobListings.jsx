import JobListing from "./JobListing";
import { Link } from "react-router-dom";

const JobListings = ({jobs}) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobListing key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;
