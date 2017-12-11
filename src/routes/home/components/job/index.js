import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import style from './style.css'
import Icon from '../../../../components/icon'

const Header = ({ createdAt, description, downvotes, link, upvotes }) => (
  <li class={style.wrapper}>
    <div>
      <a href={link} class={style.title}>
        <h1>{description}</h1>
      </a>
      <p class={style.meta}>
        Posted {distanceInWordsToNow(createdAt)} ago in SomeSlackChannel
      </p>
    </div>
    <div class={style.votes}>
      <span class={style.upvotes}>
        <Icon value="thumb_up" alt="Upvotes" /> {upvotes}
      </span>
      <span class={style.downvotes}>
        <Icon value="thumb_down" alt="Downvotes" /> {downvotes}
      </span>
    </div>
  </li>
)

Header.defaultProps = {
  createdAt: 0,
  description: 'No description',
  downvotes: 0,
  link: '',
  upvotes: 0,
}

Header.propTypes = {
  createdAt: PropTypes.number,
  description: PropTypes.string,
  downvotes: PropTypes.number,
  link: PropTypes.string,
  upvotes: PropTypes.number,
}

export default Header
