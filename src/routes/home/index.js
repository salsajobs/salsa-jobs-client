import { h, Component } from 'preact'
import style from './style.css'
import Job from './components/job'

const API_URL = 'http://localhost:3000'

class Home extends Component {
  state = {
    jobs: [],
  }

  componentDidMount() {
    fetch(`${API_URL}/jobs`)
      .then(res => res.json())
      .then(jobs => jobs && this.setState({ jobs }))
  }

  render() {
    return (
      <ul class={style.jobsList}>
        {this.state.jobs.map(job => <Job {...job} />)}
      </ul>
    )
  }
}

export default Home
