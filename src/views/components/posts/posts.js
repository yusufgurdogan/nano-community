import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { List } from 'immutable'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import Post from '@components/post'
import { Post as PostRecord } from '@core/posts'

import './posts.styl'

export default class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = { age: props.age }
  }

  handleChange = (e, value) => {
    this.setState({ age: value })
    this.props.getPosts(this.props.id, { age: value })
  }

  componentDidMount() {
    const { age } = this.state
    const { label } = this.props
    this.props.getPosts(this.props.id, { age, label })
  }

  render() {
    const { title, posts, isPending } = this.props

    let skeletons = new List()
    if (isPending) {
      skeletons = skeletons.push(new PostRecord())
      skeletons = skeletons.push(new PostRecord())
      skeletons = skeletons.push(new PostRecord())
    } else if (!posts.size) {
      return null
    }

    const items = (posts.size ? posts : skeletons).map((p, k) => (
      <Post key={k} post={p} />
    ))

    return (
      <div className='posts__container'>
        <div className='header__container'>
          <div className='header__title'>
            <span>{title}</span>
          </div>
          {this.props.id === 'top' && (
            <ToggleButtonGroup
              value={this.state.age}
              exclusive
              onChange={this.handleChange}
              aria-label='age'
              className='toggle-button-group'>
              <ToggleButton value={72}>3D</ToggleButton>
              <ToggleButton value={168}>7D</ToggleButton>
              <ToggleButton value={720}>1M</ToggleButton>
            </ToggleButtonGroup>
          )}
          {this.props.id === 'announcements' && (
            <ToggleButtonGroup
              value={this.state.age}
              exclusive
              onChange={this.handleChange}
              aria-label='age'
              className='toggle-button-group'>
              <ToggleButton value={36}>3D</ToggleButton>
              <ToggleButton value={168}>7D</ToggleButton>
              <ToggleButton value={336}>14D</ToggleButton>
              <ToggleButton value={720}>1M</ToggleButton>
            </ToggleButtonGroup>
          )}
        </div>
        <div className='posts__body'>{items}</div>
      </div>
    )
  }
}

Posts.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  age: PropTypes.number,
  label: PropTypes.string,
  posts: ImmutablePropTypes.list,
  isPending: PropTypes.bool,
  getPosts: PropTypes.func
}
