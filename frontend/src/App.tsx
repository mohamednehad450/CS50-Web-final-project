import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Screens
import {
  routes,
  Home,
  Pomodoro,
  TodoList,
  HabitTracker,
  Graphs,
  Settings,
} from './screens'

import { Navbar, NavItem } from './components/nav'

import { ReactComponent as PomIcon } from './icons/pomodoro.svg'
import { ReactComponent as TodoIcon } from './icons/todo-list.svg'
import { ReactComponent as HabitIcon } from './icons/habit-tracker.svg'
import { ReactComponent as GraphIcon } from './icons/graph.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'


function App() {
  return (
    <div className="light">
      <Router>
        <Navbar>
          <NavItem path={routes.POMODORO} Icon={<PomIcon />} />
          <NavItem path={routes.TODOLIST} Icon={<TodoIcon />} />
          <NavItem path={routes.HABITTRACKER} Icon={<HabitIcon />} />
          <NavItem path={routes.GRAPHS} Icon={<GraphIcon />} />
          <NavItem path={routes.SETTINGS} Icon={<SettingsIcon />} />
        </Navbar>
        <main>
          <Switch>
            <Route path={routes.POMODORO}>
              <Pomodoro />
            </Route>
            <Route path={routes.TODOLIST}>
              <TodoList />
            </Route>
            <Route path={routes.HABITTRACKER}>
              <HabitTracker />
            </Route>
            <Route path={routes.GRAPHS}>
              <Graphs />
            </Route>
            <Route path={routes.SETTINGS}>
              <Settings />
            </Route>
            <Route path={routes.HOME}>
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
