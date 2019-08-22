import React, { Component } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Steps from './components/Steps';
import splitSteps from './helpers/splitSteps';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: []
    };
  }

  async componentDidMount() {
    const res = await fetch('readme.md');
    const markdown = await res.text();
    const steps = splitSteps(markdown);
    this.setState({ steps }, Prism.highlightAll);
    // setTimeout(
    //   () => (),
    //   100
    // );
  }

  render() {
    const { steps } = this.state;
    return (
      <div className="App">
        <Hero />
        <section className="section">
	        <div className="container">
	        	<div className="columns">
              <Menu steps={steps} />

              <div className="column is-9">
                <div className="content is-medium">
                  <h3 className="title is-3">Étapes </h3>
                  <p><em>Voici toutes les étapes à réaliser pour découvrir JavaScript</em></p>

                    <Steps steps={steps} />
                </div>
              </div>
            </div>
          </div>
        </section>
      
      </div>
    );
  }
}

export default App;
