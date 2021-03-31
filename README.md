# My CS50 Web Final Project

---

## Overview 

### Implemented Features:

* a Todo List featuring:
    - Color Tags
    - Deadlines
    - Optional steps

* A Pomodoro Timer featuring:
    - Intervals time recoring 
    - Linking intervals to a Todo
    - Notifications and Sound feedback

* A Habit Tracker.

* Statistics functionality featuring:
    - Todoay's Summary
    - Todo List Stats
    - Pomodoro Intervals Stats
    - Habit Tracker Stats

* A Settings Page

* Dark and Solar Themes

---

## Setup

### Backend (Django)

1. Install Django:

    ```pip3 install django```

2. Install Django REST framework:

    ``` pip3 install djangorestframework ```

3. Install Django REST framework JWT Auth:

    ```pip3 install djangorestframework-jwt```

#### Frontend (React)

1. Install Node.js LTS [here](https://nodejs.org/) or using nvm [here](https://github.com/nvm-sh/nvm)

2. Install yarn package manager

    ```npm install -g yarn```

3. Get into the frontend folder

    ```cd frontend```

4. Install frontend dependencies

    ```yarn install```

5. Build the frontend production
    ```yarn build```

---

## Project Structure

### The Backend (Django)

The Django project contains 1 app called `todo` which contains all the models and APIViews and serves the React frontend.

#### Models `todo/models.py`

##### Todo
Represents a todo with:
* A title field
* The user(owner) field
* Optional tag field
* A checked date field
* A due date field
* A created at date field
##### Step
Represents a step in a todo with:
* A title field
* A checked date field 
* A due date field
##### Tag
Represents a tag with:
* The user(owner) field
* A label field
* A color field
##### PomodoroInterval
Represents a pomodoro interval with:
* The user(owner) field
* Optional todo field
* A start date field
* A end date field
* The default(settings) duration field
##### Habit
Represents a habit with:
* A title field
* The user(owner) field
* A created at date field
##### HabitEntry
Represents a checked date in a habit

#### Serializers `todo/serializers.py`

Here each model has a serializer that sits between the APIView and the Django models.

#### Views `todo/views.py`

##### frontend

All non-matched urls redirects to the frontend

##### TodoViewSet

* `/api/todos/` `GET`: List all todos.
* `/api/todos/` `POST`: Creates a new todo.
* `/api/todos/{id}/` `GET`: Gets an existing todo.
* `/api/todos/{id}/` `PATCH`: updates an existing todo.
* `/api/todos/{id}/` `DELETE`: deletes an existing todo.
* `/api/todos/{id}/update_step/` `POST`: Updates a step in the todo.


##### TagViewSet

* `/api/tags/` `GET`: List all tags.
* `/api/tags/` `POST`: Creates a new tag.
* `/api/tags/{id}/` `GET`: Gets an existing tag.
* `/api/tags/{id}/` `PATCH`: updates an existing tag.
* `/api/tags/{id}/` `DELETE`: deletes an existing tag.


##### PomodoroViewSet


* `/api/pomodoros/` `GET`: List all pomodoro intervals.
* `/api/pomodoros/` `POST`: Creates a new interval.
* `/api/pomodoros/{id}/` `GET`: Gets an existing interval.


##### HabitViewSet

* `/api/habits/` `GET`: List all habits.
* `/api/habits/` `POST`: Creates a new habit.
* `/api/habits/{id}/` `GET`: Gets an existing habit.
* `/api/habits/{id}/` `PATCH`: updates an existing habit.
* `/api/habits/{id}/` `DELETE`: deletes an existing habit.
* `/api/habits/{id}/add_entry/` `POST`: Add an entry to an existing habit.
* `/api/habits/{id}/remove_entry/` `POST`: Removes an entry from an existing habit.


##### create_auth

Creates a new user.

### The Frontend (React)

The frontend is created by [create-react-app](https://create-react-app.dev/) and sits in `frontend/`.

#### Build `frontend/build/`

Here is the production build that Django hooks into.

#### App `frontend/src/App.tsx`

Here is the main entry point to the frontend src.

#### Styles `frontend/src/index.css`

This is the main styling file which contains all the styles.

#### Components `frontend/src/components/`

##### Common `./common`
contains all the general components.

##### Nav `./nav`
contains all the nav components.

##### Theme `./theme`
contains the ThemeProvider.

##### Todo List `./TodoList`
- All components used in the TodoList screen.
- `./TodoList/hooks` which contains the TodoContext.
- `./TodoList/ProvideTodo` for providing the TodoContext.
- `./TodoList/utils` which contains all the todo utilities.

##### Pomodoro `./Pomodoro`
- All components used in the Pomodoro screen.
- `./Pomodoro/hooks` which contains the PomodoroContext.
- `./Pomodoro/ProvidePomodoro` for providing the PomodoroContext.
- `./Pomodoro/intervalContext` for providing the IntervalContext.

##### Habit Tracker `./HabitTracker`
- All components used in the HabitTracker screen.
- `./HabitTracker/hooks` which contains the HabitContext.
- `./HabitTracker/ProvideHabits` for providing the HabitContext.

##### Graphs `./Graphs`
- All components used in the Graphs screen.
- `./Graphs/hooks` which contains the StatsContext.
- `./Graphs/ProvideStats` for providing the StatsContext.

##### Settings `./Settings`
- All components used in the Graphs screen.
- `./Settings/hooks` which contains the SettingsContext.
- `./Settings/ProvideSettings` for providing the SettingsContext.


#### Screens `frontend/src/screens/`

Each screen in the app has a separate file in `./screens` and as shown above, a folder in `frontend/src/components/`(except Signin and Register).

Each screen folder in `frontend/src/components/` has a context to manage the state, a context provider and custom component for that screen.

Also contains `routes` which defines the routes names.

#### API `frontend/src/API/`

* Auth `./auth`: contains all the todos api methods.
* Tags `./tags`: contains all the tags api methods.
* Habits `./habits`: contains all the habits api methods.
* Pomodoro `./pomodoro`: contains all the pomodoro api methods.
* And some auth components like: `PrivateRoute` and `ProvideAuth`

#### Audio `frontend/src/audio/`

Contains all the audio assets.

#### Icons `frontend/src/icons/`

Contains all the icons assets.

#### Utils `frontend/src/utils/`

Contains all the utilities functions.
