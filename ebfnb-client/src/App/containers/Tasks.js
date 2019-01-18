/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Redirect, Link } from "react-router-dom"
import { withRouter, Route } from "react-router"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import React, { useState } from "react"
import Spinner from "../components/Spinner"
import LayoutContainer from "../components/LayoutContainer"
import NavMenuItem from "../components/NavMenuItem"
import Card from "../components/Card"
import { dropLast } from "ramda"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//TaskList component
const TASK_IDS = gql`
  query {
    TaskIds {
      id
    }
  }
`
const navCss = css`
  // display: flex;
  overflow: hidden;
  // background-color: #ddd;
  height: 35px;
  padding: 5px;
  // border: 2px solid;
`
const menuItemStyles = {
  onHoverCss: css`
    &:hover,
    &:active,
    &:focus {
      color: black;
    }
  `,
  activeCss: css`
    cursor: default;
    font-weight: bold;
    color: green;
    border-bottom: 2px solid green;
    // border: 2px solid;
  `,
  css: css`
    float: left;
    color: #888;
    padding: 5px 16px;
    line-height: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
  `
}
const TaskListMenuItem = props => <NavMenuItem {...props} {...menuItemStyles} />
const toRightCss = css`
  float: right;
`
const TaskListNav = withRouter(({ match: { url } }) => {
  const path = path => `${url}/${path}`
  const [activeMenu, setActiveMenu] = useState("all")
  const activeProps = name => ({
    makeActive: () => setActiveMenu(name),
    isActive: name === activeMenu
  })
  return (
    <nav css={navCss}>
      <TaskListMenuItem
        to={path(":active")}
        {...menuItemStyles}
        {...activeProps("active")}
      >
        Active
      </TaskListMenuItem>
      <TaskListMenuItem
        to={path(":onHold")}
        {...menuItemStyles}
        {...activeProps("onHold")}
      >
        On hold
      </TaskListMenuItem>
      <TaskListMenuItem
        to={path(":all")}
        {...menuItemStyles}
        css={toRightCss}
        {...activeProps("all")}
      >
        All
      </TaskListMenuItem>
    </nav>
  )
})

//TaskList component
const taskListCss = css`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
`
const TaskList = ({ match }) => {
  const {
    data: { TaskIds }
  } = useQuery(TASK_IDS, {
    variables: { input: { filter: match.params.filter } }
  })
  return (
    <div css={taskListCss}>
      {TaskIds.map(({ id }) => (
        <Task.Card id={id} key={id} />
      ))}
    </div>
  )
}

//Task component
const Task = {}
const TASK = gql`
  query taskById($id: String) {
    Task(id: $id) {
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
    }
  }
`
const NEW_VOLUNTEER_PROFILE = gql`
  query userProfileById($id: String) {
    UserProfile(id: $id) {
      name
    }
  }
`
const cardCss = css`
  border: 1px solid transparent;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 0.3125rem 0.625rem;
  width: 100%;
  text-decoration: none;
  &:hover {
    background-color: #eee;
    border-color: #ddd;
  }
  div {
    flex-grow: 1;
  }
`

Task.Card = ({ id, ...props }) => {
  // const {
  //   data: { Task }
  // } = useQuery(TASK, { variables: { $id: id } })
  // const {
  //   data: { UserProfile:newVolunteerProfile}
  // } = useQuery(TASK, { variables: { $id: Task.volunteerUserId } })
  const Task = {
    id: "1",
    title: "New Volunteer Task",
    summary:
      "Out of the blue, in a flash of red, with a lou bang, the call has come, new volunteer, its him, the wait is over",
    status: {
      label: "onHold",
      reason: "waiting for response"
    },
    dateCreated: "xmass",
    dateOfStatusChange: "New year",
    commentIds: [1, 2, 3, 4],
    volunteerUserId: "1"
  }
  const newVolunteerProfile = { name: "John Doe" }
  // const shortSummary = dropLast(Task.summary.slice(50).split(" "))
  //   .push("...")
  //   .join(" ")
  return (
    <Link css={cardCss} {...props} to="">
      <div id="header">
        <h3>{Task.title}</h3>
        <p>{newVolunteerProfile.name}</p>
        <p>First contact on: {Task.dateCreated}</p>
      </div>
      <div id="status">
        <p>
          {Task.status.label} since {Task.dateOfStatusChange}
        </p>
        <p>{Task.status.reason}</p>
      </div>
      <div id="summary">{Task.summary}</div>
      <div id="footer">
        <span className="fa-layers fa-fw" style={{ float: "right" }}>
          <i className="fas fa-comment" />
          <span className="fa-layers-counter">{Task.commentIds.length}</span>
        </span>
        {/* <span>
          <FontAwesomeIcon icon="comment" />
        </span> */}
      </div>
    </Link>
  )
}

const Tasks = ({ match: { url, params }, location: { pathname } }) => {
  const path = path => `${url}/${path}`
  if (url === pathname) {
    return <Redirect to={path("list/:all")} />
  }
  return (
    <LayoutContainer>
      <Route path={path("list")} component={TaskListNav} />
      <React.Suspense fallback={<Spinner size="3x" />}>
        <Route path={path("list/:filter")} component={TaskList} />
        <Route path={path("task/:id")} component={Task.Card} />
      </React.Suspense>
    </LayoutContainer>
  )
}
export default Tasks
