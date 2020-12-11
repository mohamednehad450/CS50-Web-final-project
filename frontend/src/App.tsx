import React from 'react';
import {
  BrowserRouter as Router, 
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
  Screen
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
          <Screen
            route={routes.HOME}
            exact
            lazy
            unmountOnExit
          >
            <Home />
          </Screen>
          <Screen
            route={routes.POMODORO}
            lazy
          >
            <Pomodoro />
          </Screen>
          <Screen
            route={routes.TODOLIST}
            lazy
          >
            <TodoList />
          </Screen>
          <Screen
            route={routes.GRAPHS}
            lazy
            unmountOnExit
          >
            <Graphs />
          </Screen>
          <Screen
            route={routes.HABITTRACKER}
            lazy
            unmountOnExit
          >
            <HabitTracker />
          </Screen>
          <Screen
            route={routes.SETTINGS}
            lazy
            unmountOnExit
          >
            <Settings />
          </Screen>
        </main>
      </Router>
    </div>
  );
}

export default App;
