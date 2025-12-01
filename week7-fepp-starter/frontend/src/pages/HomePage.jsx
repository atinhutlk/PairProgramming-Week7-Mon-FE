import {useEffect, useState} from 'react';
import JobListings from "../components/JobListings";

const Home = () => {
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
          setError(null);
        }
        else {
          throw new Error("Fail to fetch jobs");
        }
      } catch (err) {
          setError(err.message);
      }
    };
    // setTimeout(() => {fetchJobs();}, 1000); // Delay of 1 second
    fetchJobs();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {jobs && <JobListings jobs={jobs} />}
    </div>
  );
};

export default Home;
