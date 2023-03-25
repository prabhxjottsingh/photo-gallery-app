import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react'
import Home from './pages/Home';
import About from './pages/About';
import Wallipis from './pages/Wallipis';
import Navigation from './components/Navigation';
import Footer from './components/Footer';


const App = () => {

    return (
        <>
            <Router>
            <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact></Route>
                    <Route path='/about' component={About}></Route>
                    <Route path='/search/:query' component={Wallipis}></Route>
                    </Switch>
            <Footer />
            </Router>
        </>
    )
}

export default App;
