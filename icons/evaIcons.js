import React from 'react'
import { Icon } from '@ui-kitten/components'

export const Cart = props => (
  <Icon
    {...props}
    name='shopping-cart'
    // fill='#fff'
    style={{ width: 24, height: 24, tintColor: '#fff' }}
  />
)

export const BookmarkOutline = props => (
  <Icon
    {...props}
    name='bookmark-outline'
    style={{ width: 24, height: 24, tintColor: '#FF3D71', marginLeft: 4 }}
  />
)

export const Bookmark = props => (
  <Icon
    {...props}
    name='bookmark'
    style={{ width: 24, height: 24, tintColor: '#FF3D71', marginLeft: 4 }}
  />
)

export const AlertIcon = props => (
  <Icon {...props} name='alert-circle-outline' />
)

export const PersonIcon = props => (
  <Icon
    {...props}
    name='person'
    style={{ width: 24, height: 24, tintColor: '#222B45' }}
  />
)

export const LogoutIcon = props => (
  <Icon
    {...props}
    name='log-out'
    style={{ width: 24, height: 24, tintColor: props.tintColor }}
  />
)

export const MinIcon = props => (
  <Icon
    {...props}
    name='minus'
    style={{ width: 22, height: 22, tintColor: '#fff' }}
  />
)
