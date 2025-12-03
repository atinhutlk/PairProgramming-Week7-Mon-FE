import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // lấy job hiện tại
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setJob(data);

        setTitle(data.title || "");
        setType(data.type || "Full-Time");
        setDescription(data.description || "");
        setCompanyName(data.company?.name || "");
        setContactEmail(data.company?.contactEmail || "");
        setContactPhone(data.company?.contactPhone || "");
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const updateJob = async (updatedJob) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const token = storedUser?.token;

    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(updatedJob),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error("You must be logged in to edit jobs");
      }
      throw new Error("Failed to update job");
    }

    return await res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job) return;

    try {
      const updatedJob = {
        ...job,
        title,
        type,
        description,
        company: {
          ...(job.company || {}),
          name: companyName,
          contactEmail,
          contactPhone,
        },
      };

      await updateJob(updatedJob);
      navigate(`/jobs/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="create">
        <p>Loading job...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="create">
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Job type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <button>Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;
