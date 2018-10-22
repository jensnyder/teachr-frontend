import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import format from "date-fns/format";

const renderChip = (studentAssignment, assignment) => {
  switch (studentAssignment.status) {
    case "submitted":
      return <Chip color="primary" label="submitted" variant="outlined" />;
    case "graded":
      return (
        <Chip
          color="primary"
          label={`graded: ${studentAssignment.points_earned}/${
            assignment.points
          }`}
          variant="outlined"
        />
      );
    default:
      return (
        <Chip
          color="secondary"
          label={`${studentAssignment.status.split("_").join(" ")}`}
          variant="outlined"
        />
      );
  }
};

const StudentAssignmentListItem = ({
  teacher,
  assignment,
  studentAssignment,
  coursesName
}) => {
  return (
    <ListItem
      key={assignment.id}
      divider
      button
      component={Link}
      to={`/course/${assignment.course_id}/assignment/${assignment.id}`}
    >
      {coursesName ? (
        <ListItemText
          primary={assignment.name}
          secondary={`${coursesName[assignment.course_id]} - ${
            assignment.category
          } - ${assignment.points} points - ${format(
            assignment.due_date,
            "M/d"
          )}`}
        />
      ) : (
        <ListItemText
          primary={assignment.name}
          secondary={`${assignment.category} - ${
            assignment.points
          } points - ${format(assignment.due_date, "M/d")}`}
        />
      )}
      {studentAssignment ? (
        renderChip(studentAssignment, assignment)
      ) : (
        <Chip color="secondary" label="not started" variant="outlined" />
      )}
    </ListItem>
  );
};

export default StudentAssignmentListItem;
