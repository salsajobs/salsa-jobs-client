import PropTypes from 'prop-types'

const Icon = (
  { alt, value, ...other } // eslint-disable-line
) => (
  <i aria-label={alt} className="material-icons" {...other}>
    {value}
  </i>
)

Icon.propTypes = {
  alt: PropTypes.string,
  value: PropTypes.string,
}

Icon.defaultProps = {
  alt: '',
  value: '',
}

export default Icon
