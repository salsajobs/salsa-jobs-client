import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import style from './style.css'
import Icon from '../../../../components/icon'

const Job = ({
  createdAt,
  description,
  link,
  votes,
  meta: { team_domain },
}) => (
  <li class={style.wrapper}>
    <div>
      <a href={link} class={style.title}>
        <h1>{description}</h1>
      </a>
      <p class={style.meta}>
        Posted {distanceInWordsToNow(createdAt)} ago in {team_domain}
      </p>
    </div>
    <div class={style.votes}>
      <span class={style.upvotes}>
        <Icon value="thumb_up" alt="Upvotes" /> {votes.upvotes}
      </span>
      <span class={style.downvotes}>
        <Icon value="thumb_down" alt="Downvotes" /> {votes.downvotes}
      </span>
    </div>
  </li>
)

Job.defaultProps = {
  createdAt: 0,
  description: '-',
  link: '',
  votes: {
    downvote: {},
    upvote: {},
  },
  meta: {
    team_domain: '-',
  },
}

Job.propTypes = {
  createdAt: PropTypes.number,
  description: PropTypes.string,
  link: PropTypes.string,
  meta: PropTypes.shape({
    team_domain: PropTypes.string,
  }),
  votes: PropTypes.shape({
    downvotes: PropTypes.object,
    upvotes: PropTypes.object,
  }),
}

export default Job
