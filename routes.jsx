// routes to be shared between our server and client entry points
import React, { Component }         from 'react'
import { Route, IndexRoute, Link }  from 'react-router'

//import styles from './src/static/scss/base.scss';

import Home     from './src/components/Home'
import About    from './src/components/About'
import Work     from './src/components/Work'
import Contact  from './src/components/Contact'
import NotFound from './src/components/NotFound'

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

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="work" component={Work}/>
    <Route path="contact" component={Contact}/>
    <Route path="*" component={NotFound}/>
  </Route>
)
