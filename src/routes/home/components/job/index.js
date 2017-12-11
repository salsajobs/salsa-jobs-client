import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import style from './style.css'
import Icon from '../../../../components/icon'

const Header = ({
  createdAt,
  description,
  link,
  meta: { team_domain },
  votes: { downvotes, upvotes },
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
        <Icon value="thumb_up" alt="Upvotes" /> {upvotes.length}
      </span>
      <span class={style.downvotes}>
        <Icon value="thumb_down" alt="Downvotes" /> {downvotes.length}
      </span>
    </div>
  </li>
)

Header.defaultProps = {
  createdAt: 0,
  description: '-',
  link: '',
  votes: {
    downvotes: [],
    upvotes: [],
  },
  meta: {
    team_domain: '-',
  },
}

Header.propTypes = {
  createdAt: PropTypes.number,
  description: PropTypes.string,
  link: PropTypes.string,
  meta: PropTypes.shape({
    team_domain: PropTypes.string,
  }),
  votes: PropTypes.shape({
    downvotes: PropTypes.arrayOf(PropTypes.string),
    upvotes: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default Header
