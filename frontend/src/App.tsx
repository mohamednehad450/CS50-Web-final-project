import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
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
  SignIn,
  Screen,
  Register
} from './screens'

import { Navbar, NavItem } from './components/nav'

import { ReactComponent as PomIcon } from './icons/pomodoro.svg'
import { ReactComponent as TodoIcon } from './icons/todo-list.svg'
import { ReactComponent as HabitIcon } from './icons/habit-tracker.svg'
import { ReactComponent as GraphIcon } from './icons/graph.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'
import { PrivateRoute, ProvideAuth } from './API';


function App() {
  return (
    <div className="light">
      <ProvideAuth>
        <Router>
          <PrivateRoute path={routes.APP}>
            <Navbar>
              <NavItem path={routes.POMODORO} Icon={<PomIcon />} />
              <NavItem path={routes.TODOLIST} Icon={<TodoIcon />} />
              <NavItem path={routes.HABITTRACKER} Icon={<HabitIcon />} />
              <NavItem path={routes.GRAPHS} Icon={<GraphIcon />} />
              <NavItem path={routes.SETTINGS} Icon={<SettingsIcon />} />
            </Navbar>
          </PrivateRoute>
          <main>
            <Switch>
              <PrivateRoute path={routes.APP}>
                <Screen
                  route={routes.APP}
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
              </PrivateRoute>
              <Route path={routes.SIGININ}>
                <SignIn />
              </Route>
              <Route path={routes.REGISTER}>
                <Register />
              </Route>
              <Route path={routes.ROOT} exact>
                <Redirect to={routes.APP} />
              </Route>
              <Route path='*' >
                404 not found
              </Route>
            </Switch>
          </main>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
