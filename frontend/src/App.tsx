import React from 'react';
import { Navbar, NavItem } from './components/nav'

import { ReactComponent as PomIcon } from './icons/pomodoro.svg'
import { ReactComponent as TodoIcon } from './icons/todo-list.svg'
import { ReactComponent as HabitIcon } from './icons/habit-tracker.svg'
import { ReactComponent as GraphIcon } from './icons/graph.svg'
import { ReactComponent as SettingsIcon } from './icons/settings.svg'


function App() {
  return (
    <div className="light">
      <Navbar>
        <NavItem Icon={<PomIcon />} />
        <NavItem Icon={<TodoIcon />} />
        <NavItem Icon={<HabitIcon />} />
        <NavItem Icon={<GraphIcon />} />
        <NavItem Icon={<SettingsIcon />} />
      </Navbar>
      <main>
        Hello,World
      </main>
    </div>
  );
}

export default App;
