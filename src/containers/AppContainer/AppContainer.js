import { connect } from 'react-redux'
import { checkLogin } from '../../actions'

import { App } from '../../components'

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth
  return {
    isAuthenticated,
    profile,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

const AppContainer = connect(
  // null, // no mapStateToProps
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
