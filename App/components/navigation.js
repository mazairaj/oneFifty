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
  PostWorkout: {screen: SelectWorkout},
  Calendar: {screen: WorkoutCalendar},
  WorkoutForm: {screen: WorkoutForm}
});
//Navigation for calendar Tab
export const CalNav = StackNavigator({
  Calendar: {screen: WorkoutCalendar},
  WorkoutData: {screen: WorkoutData}
})
//TabBar NAvigation
export const TabBar = TabNavigator({
  MainPage: {screen: Navigation},
  Calendar: {screen: CalNav},
  WorkoutHistory: {screen: SelectWorkout}
})
