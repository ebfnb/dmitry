/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Link, withRouter } from "react-router-dom"
import { useQuery, useMutation } from "react-apollo-hooks"
import gql from "graphql-tag"
import React, { useState } from "react"
import Spinner from "../components/Spinner"
import LayoutContainer from "../components/LayoutContainer"
import { Form, Scope, Text, TextArea } from "informed"
import UserProfile from "./UserProfile"

//Task component
const Task = {}
const TASK_CARD = gql`
  query taskCard($id: String) {
    task(id: $id) {
      id
      title
      summary
      status {
        label
        reason
      }
      dateCreated
      dateOfStatusChange
      commentIds {
        commentId
      }
      volunteerUserId
      priority
    }
  }
`
const NEW_VOLUNTEER_NAME = gql`
  query newVolunteerName($id: String) {
    userProfile(id: $id) {
      name
    }
  }
`
const cardCss = css`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 0.3125rem 0.625rem;
  width: 100%;
  text-decoration: none;
  article {
    flex-grow: 1;
  }
`
const cardStatusCss = priority => {
  const color =
    priority === "urgent"
      ? "red"
      : priority === "warning"
      ? "yellow"
      : "inherit"
  return css`
    color: ${color};
  `
}
Task.Card = ({ id }) => {
  // const {
  //   data: { task }
  // } = useQuery(TASK_CARD, { variables: { $id: id } })
  // const {
  //   data: { userProfile:newVolunteerProfile}
  // } = useQuery(NEW_VOLUNTEER_NAME, { variables: { $id: task.volunteerUserId } })
  const task = {
    id: "1",
    title: "New Volunteer Task",
    summary:
      "Out of the blue, in a flash of red, with a loud bang, the call has come, new volunteer, its him, the wait is over",
    status: {
      label: "onHold",
      reason: "waiting for response"
    },
    dateCreated: "xmass",
    dateOfStatusChange: "New year",
    commentIds: [1, 2, 3, 4],
    volunteerUserId: "1",
    priority: "warning"
  }
  const newVolunteerProfile = { name: "John Doe" }
  // const shortSummary = dropLast(Task.summary.slice(50).split(" "))
  //   .push("...")
  //   .join(" ")
  return (
    <article css={cardCss}>
      <header>
        <Link to={`/tasks/task/edit/:${id}`}>
          <h3>{task.title}</h3>
        </Link>
        <p css={cardStatusCss(task.priority)}>
          {task.status.label} since {task.dateOfStatusChange}
        </p>
        <p>{task.status.reason}</p>
      </header>
      <section>
        <p>{newVolunteerProfile.name}</p>
        <p>First contact on: {Task.dateCreated}</p>
      </section>
      <div id="summary">{task.summary}</div>
      <footer>
        <span className="fa-layers fa-fw" style={{ float: "right" }}>
          <i className="fas fa-comment" />
          <span className="fa-layers-counter fa-2x">
            {task.commentIds.length}
          </span>
        </span>
      </footer>
    </article>
  )
}

const TASK = gql`
  query task($id: String) {
    task(id: $id) {
      id
      title
      summary
      status {
        label
        reason
      }
      dateCreated
      dateOfStatusChange
      commentIds {
        commentId
      }
      volunteerUserId
      priority
    }
  }
`
const EDIT_TASK = gql`
  mutation editTask($updater: updater) {
    editTask(updater: $updater)
  }
`
Task.Edit = ({ match }) => {
  const {
    data: { task },
    refetch
  } = useQuery(TASK, { variables: { $id: match.params.id } })
  const {
    data: { userProfile: newVolunteerProfile }
  } = useQuery(NEW_VOLUNTEER_NAME, { variables: { $id: task.volunteerUserId } })
  const editTask = useMutation(EDIT_TASK)
  const onSubmit = values => {
    editTask({ variables: { updater: values } }).then(() =>
      refetch({ $id: match.params.id })
    )
  }
  return (
    <LayoutContainer>
      <Form initialValues={task}>
        <nav>
          <button type="submit">Submit</button>
        </nav>
        <header>
          <h3>{task.title}</h3>
        </header>

        <label>Status</label>
        <Scope scope="status">
          <label>State</label>
          <Text field="label" />
          <label>Reason</label>
          <TextArea field="reason" />
        </Scope>
      </Form>
    </LayoutContainer>
  )
}
Task.Create = () => {
  return "create new task"
}

export default Task
