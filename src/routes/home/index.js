import { h, Component } from 'preact'
import style from './style.css'
import Job from './components/job'
import Spinner from './components/spinner'
import config from '../../config'

class Home extends Component {
  state = {
    jobs: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`${config.API_URL}/${config.DATABASE_NAME}`)
      .then(res => res.json())
      .then(jobs => jobs && this.setState({ jobs, loading: false }))
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }
    return (
      <ul class={style.jobsList}>
        {this.state.jobs.map(job => <Job {...job} />)}
      </ul>
    )
  }
}

export default Home
