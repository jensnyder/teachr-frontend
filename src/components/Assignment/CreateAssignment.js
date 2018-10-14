import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { createAssignment } from "../../redux/actions/assignmentActions";

const styles = {
  paper: {
    margin: "20px",
    maxWidth: 1000
  },
  heading: {
    padding: "20px"
  },
  button: {
    padding: "20px",
    marginLeft: "430px"
  },
  textField: {
    marginLeft: "20px",
    marginTop: "20px"
  }
};

const categories = [
  {
    value: 0,
    label: "CW"
  },
  {
    value: 1,
    label: "HW"
  },
  {
    value: 2,
    label: "TQP"
  }
];

class CreateAssignment extends React.Component {
  state = {
    courseId: "",
    name: "",
    points: 10,
    category: 0
  };

  componentDidMount() {
    const courseId = parseInt(this.props.match.url.split("/")[2]);
    this.setState({
      courseId: courseId
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const assignmentParams = {
      course_id: this.state.courseId,
      name: this.state.name,
      points: this.state.points,
      category: this.state.category
    };
    this.props.createAssignment(assignmentParams, this.props.history.push);
  };

  render() {
    const { courses, classes } = this.props;
    return courses ? (
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          Create Assignment
        </Typography>
        <Divider />
        <form onSubmit={this.handleSubmit}>
          <TextField
            select
            label="Course"
            className={classes.textField}
            value={this.state.courseId}
            onChange={this.handleChange("courseId")}
            SelectProps={{ MenuProps: { className: classes.menu } }}
            margin="normal"
          >
            {courses.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Assignment Name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            select
            label="Category"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange("category")}
            SelectProps={{ MenuProps: { className: classes.menu } }}
            margin="normal"
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Points"
            value={this.state.points}
            onChange={this.handleChange("points")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            margin="normal"
          />
          <Button className={classes.button} type="submit">
            Create Assignment
          </Button>
        </form>
      </Paper>
    ) : null;
  }
}

const mapStateToProps = state => {
  let courses;
  if (state.user && state.user.person.teacher) {
    courses = state.user.person.teacher.courses;
  }
  return {
    courses: courses
  };
};

const styledCreateAssignment = withStyles(styles)(CreateAssignment);
export default withRouter(
  connect(
    mapStateToProps,
    { createAssignment }
  )(styledCreateAssignment)
);