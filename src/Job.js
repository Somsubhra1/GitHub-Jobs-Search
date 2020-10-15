import React, { useState } from "react";
import { Badge, Button, Card, Collapse } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export default function Job({ job }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">
              {job.type}
            </Badge>
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown source={job.how_to_apply} escapeHtml={false} />
            </div>
          </div>
          <img
            className="d-none d-md-block"
            height="50"
            src={job.company_logo}
            alt={job.company}
          />
        </div>

        <Card.Text>
          <Button onClick={() => setOpen((prevOpen) => !prevOpen)}>
            {open ? "Hide Details" : "View Details"}
          </Button>
        </Card.Text>

        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} escapeHtml={false} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
