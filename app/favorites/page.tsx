import React from 'react'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getCurrentUser from '../actions/getCurrentUser'
import getFavorites from '../actions/getFavorites'
import Container from '../components/Container'
import Heading from '../components/Heading'
import FavoriteClient from './FavoriteClient'
type Props = {}

async function FavoritesPage({}: Props) {
  const currentUser = await getCurrentUser();
  const listings = await getFavorites();
  if(listings.length === 0) {
      return (
        <ClientOnly>
            <EmptyState 
                title='No favorites found'
                subTitle='Looks like you have no favorites listings'
            />
        </ClientOnly>
      )

  }
  return <ClientOnly>
    <FavoriteClient 
      listings={listings}
      currentUser={currentUser}
    />
  </ClientOnly>
}

export default FavoritesPage