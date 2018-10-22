import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import format from "date-fns/format";

const StudentAssignmentListItem = ({
  teacher,
  assignment,
  studentAssignment,
  courses
}) => {
  return (
    <ListItem
      key={assignment.id}
      divider
      button
      component={Link}
      to={`/course/${assignment.course_id}/assignment/${assignment.id}`}
    >
      {courses ? (
        <ListItemText
          primary={assignment.name}
          secondary={`${assignment.category} - ${
            assignment.points
          } points - ${format(assignment.due_date, "M/d")}`}
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
        <Chip
          color="primary"
          label={`${studentAssignment.status.split("_").join(" ")}`}
          variant="outlined"
        />
      ) : (
        <Chip color="primary" label="not started" variant="outlined" />
      )}
    </ListItem>
  );
};

export default StudentAssignmentListItem;
