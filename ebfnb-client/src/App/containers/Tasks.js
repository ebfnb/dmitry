/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Redirect, Link } from "react-router-dom"
import { Route } from "react-router"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import React, { useState } from "react"
import Spinner from "../components/Spinner"
import LayoutContainer from "../components/LayoutContainer"
import NavMenuItem from "../components/NavMenuItem"
import Task from "./Task"

//TaskList component
const TASK_IDS = gql`
  query {
    TaskIds {
      id
    }
  }
`
const navCss = css`
  overflow: hidden;
  height: 35px;
  padding: 5px;
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
const taskListCss = css`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
`
const TaskListMenuItem = props => <NavMenuItem {...props} {...menuItemStyles} />
const toRightCss = css`
  float: right;
`
const TaskList = ({ match }) => {
  const [activeMenu, setActiveMenu] = useState("active")
  const {
    data: { TaskIds }
  } = useQuery(TASK_IDS, {
    variables: { input: { filter: activeMenu } }
  })
  const path = path => `${match.url}/${path}`
  const activeProps = name => ({
    makeActive: () => setActiveMenu(name),
    isActive: name === activeMenu
  })
  return (
    <div>
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
        <Link to="/tasks/task/create" css={toRightCss}>
          <span className="fa-layers fa-fw">
            <i className="fas fa-plus" />
          </span>
        </Link>
      </nav>
      <div css={taskListCss}>
        {TaskIds.map(({ id }) => (
          <Task.Card id={id} key={id} />
        ))}
      </div>
    </div>
  )
}

const Tasks = ({ match: { url }, location: { pathname } }) => {
  const path = path => `${url}/${path}`
  if (url === pathname) return <Redirect to={path("list")} />
  return (
    <LayoutContainer>
      <React.Suspense fallback={<Spinner size="3x" />}>
        <Route path={path("list")} component={TaskList} />
        <Route path={path("task/edit/:id")} component={Task.Edit} />
        <Route path={path("task/create")} component={Task.Create} />
      </React.Suspense>
    </LayoutContainer>
  )
}
export default Tasks
