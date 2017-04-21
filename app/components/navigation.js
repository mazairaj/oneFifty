import { StackNavigator } from 'react-navigation';
import Tabs from './tabs';
import WorkoutCalendar from './workoutCalendar';
import WorkoutForm from './workoutForm';
import Main from './mainPage';

const Navigation = StackNavigator({
  MainPage: {screen: Main},
  TeamPage: {screen: Tabs},
  PostWorkout: {screen: WorkoutForm},
  Calendar: {screen: WorkoutCalendar}
});

export default Navigation
