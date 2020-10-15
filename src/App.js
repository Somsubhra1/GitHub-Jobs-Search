import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";

function App() {
  const { jobs, loading, error } = useFetchJobs();

  const [params, setParams] = useState({});
  const [page, setPage] = useState(0);

  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      <h1>{jobs.length}</h1>
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
