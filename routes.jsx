// routes to be shared between our server and client entry points
import React, { Component }         from 'react'
import { Route, IndexRoute, Link }  from 'react-router'

import Home from './src/components/Home'
import styles from './src/static/scss/base.scss';

// Main component
class App extends Component {
  componentDidMount() {
    document.body.className = ''
  }
  render() {
    return (
      <div className="wrapper">
        <header className="header">
          <h1>React Universal Blog</h1>
           <nav>
              <ul>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/about">About</Link></li>
                 <li><Link to="/work">Work</Link></li>
                 <li><Link to="/contact">Contact</Link></li>
              </ul>
           </nav>
        </header>
        { this.props.children }
      </div>
    )
  }
}

// Pages
class About extends Component {
  render() {
    return (
      <div className="page page--about">
        <h2>About</h2>
        <div>Some about page content</div>
      </div>
    )
  }
}
class Work extends Component {
  render() {
    return (
      <div className="page page--work">
        <h2>Work</h2>
        <div>Some work page content</div>
      </div>
    )
  }
}
class Contact extends Component {
  render() {
    return (
      <div className="page page--contact">
        <h2>Contact</h2>
        <div>Some contact page content</div>
      </div>
    )
  }
}
class NoMatch extends Component {
  render() {
    return (
      <div className="page page--404">
        <h2>NoMatch</h2>
        <div>404 error</div>
      </div>
    )
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="work" component={Work}/>
    <Route path="contact" component={Contact}/>
    <Route path="*" component={NoMatch}/>
  </Route>
)
