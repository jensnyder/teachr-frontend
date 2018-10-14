import { getUserFromToken } from "./userActions";

function createAssignment(assignmentParams, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/assignments", {
      method: "POST",
      body: JSON.stringify({ assignment: assignmentParams }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/course/${json.course.id}/assignment/${json.id}`);
      });
  };
}

export { createAssignment };
