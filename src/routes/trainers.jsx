import { Switch, Route, useRouteMatch } from 'react-router-dom';
import TrainerProfile from 'Components/TrainersHome/Profile/index';
import TrainersEdit from 'Components/Trainers/FormTrainers/index';
import Schedule from 'Components/Schedule';

const TrainerRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}/profile`} component={TrainerProfile} />
      <Route exact path={`${url}/form/:id`} component={TrainersEdit} />
      <Route exact path={`${url}/schedule`} component={Schedule} />
    </Switch>
  );
};

export default TrainerRoutes;
