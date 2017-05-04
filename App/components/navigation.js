import { StackNavigator, TabNavigator } from 'react-navigation';
import Tabs from './tabs';
import WorkoutCalendar from './workoutCalendar';
import WorkoutForm from './workoutForm';
import Main from './mainPage';
import SelectWorkout from './selectWorkout';
import WorkoutData from './workoutData';
import TeamPage from './teamPage'

//Navigation Called on First Tab
export const Navigation = StackNavigator({
  MainPage: {screen: Main},
  TeamPage: {screen: TeamPage},
});
//Navigation for calendar Tab
export const CalNav = StackNavigator({
  Calendar: {screen: WorkoutCalendar},
  WorkoutData: {
    screen: WorkoutData,
  }
})

export const WorkoutHistNav = StackNavigator({
  SelectWorkout: {screen: SelectWorkout},
  WorkoutForm: {screen: WorkoutForm}
})
//TabBar NAvigation
export const TabBar = TabNavigator({
  MainPage: {screen: TeamPage},
  Calendar: {screen: CalNav},
  WorkoutHistory: {screen: WorkoutHistNav}
})
