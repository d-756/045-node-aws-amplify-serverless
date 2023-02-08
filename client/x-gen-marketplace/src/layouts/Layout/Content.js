import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import NotFound from '../../components/NotFound';
import contentRoutes from '../../routes/content';

const Content = ({ location, history, loggedIn, fixed }) => (
  <Container fixed>
    <div id="ds-content" className={`content${loggedIn ? ' logged' : ''}`}>
      <div className="main">
        <Switch>
          {contentRoutes.map((route, key) => {
            if (route.redirect) return <Redirect exact from={route.path} to={route.to} key={key} />
            return <Route path={route.path} component={route.component} key={key} />
          })}
          <Route path="*" exact component={NotFound} />
        </Switch>
      </div>
    </div>
  </Container>
)

export default Content
