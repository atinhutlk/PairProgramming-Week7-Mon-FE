import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteJob = async (jobId) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Job not found");
        }

        const data = await res.json();
        setJobData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const onDelete = async (jobId) => {
    await deleteJob(jobId);
    navigate("/");
  };

  const onEdit = () => {
    navigate(`/edit-job/${id}`);
  };

  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{jobData.title}</h2>
          <p>Type: {jobData.type}</p>
          <p>Description: {jobData.description}</p>
          <p>Company: {jobData.company.name}</p>
          <p>Email: {jobData.company.contactEmail}</p>
          <p>Phone: {jobData.company.contactPhone}</p>

          <button onClick={onEdit} style={{ marginRight: "0.5rem" }}>
            edit
          </button>
          <button onClick={() => onDelete(jobData._id)}>delete</button>
        </>
      )}
    </div>
  );
};

export default JobPage;
