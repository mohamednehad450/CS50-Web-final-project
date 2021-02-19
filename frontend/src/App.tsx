import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from "react-router-dom";

import { ProvidePomodoro } from './components/Pomodoro';
// Screens
import {
  routes,
  Pomodoro,
  TodoList,
  HabitTracker,
  Graphs,
  Settings,
  SignIn,
  Register
} from './screens'
import { Navbar, NavItem } from './components/nav'

import { ReactComponent as PomIcon } from './icons/pomodoro.svg'
import { ReactComponent as TodoIcon } from './icons/todo-list.svg'
import { ReactComponent as HabitIcon } from './icons/habit-tracker.svg'
import { ReactComponent as GraphIcon } from './icons/graph.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'
import { PrivateRoute, ProvideAuth } from './API';
import { ProvideTodo } from './components/TodoList';
import { ProvideSettings } from './components/Settings';
import { ThemeProvider } from './components/theme';


function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute path={routes.APP}>
            <ProvideSettings>
              <ThemeProvider>
                <ProvidePomodoro>
                  <ProvideTodo>
                    <Navbar>
                      <NavItem path={routes.POMODORO} Icon={<PomIcon />} />
                      <NavItem path={routes.TODOLIST} Icon={<TodoIcon />} />
                      <NavItem path={routes.HABITTRACKER} Icon={<HabitIcon />} />
                      <NavItem path={routes.GRAPHS} Icon={<GraphIcon />} />
                      <NavItem path={routes.SETTINGS} Icon={<SettingsIcon />} />
                    </Navbar>
                    <main>
                      {/* Main App */}
                      <Switch>
                        <Route
                          path={routes.APP}
                          exact
                        >
                          <Redirect to={routes.TODOLIST} />
                        </Route>
                        <Route
                          path={routes.POMODORO}
                          exact
                        >
                          <Pomodoro />
                        </Route>
                        <Route
                          path={routes.TODOLIST}
                          exact
                        >
                          <TodoList />
                        </Route>
                        <Route
                          path={routes.GRAPHS}
                          exact
                        >
                          <Graphs />
                        </Route>
                        <Route
                          path={routes.HABITTRACKER}
                          exact
                        >
                          <HabitTracker />
                        </Route>
                        <Route
                          path={routes.SETTINGS}
                          exact
                        >
                          <Settings />
                        </Route>
                        {/* Catch all route */}
                        <Route path='*' >
                          404 not found
                      </Route>
                      </Switch>
                    </main>
                  </ProvideTodo>
                </ProvidePomodoro>
              </ThemeProvider>
            </ProvideSettings>
          </PrivateRoute>
          {/* Authentication */}
          <div className="light">
            <Route path={routes.SIGININ}>
              <main>
                <SignIn />
              </main>
            </Route>
            <Route path={routes.REGISTER}>
              <main>
                <Register />
              </main>
            </Route>
            <Route path={routes.ROOT} exact>
              <Redirect to={routes.APP} />
            </Route>
            {/* Catch all route */}
            <Route path='*' >
              404 not found
            </Route>
          </div>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
