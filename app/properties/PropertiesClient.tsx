"use client"
import React, { useCallback, useState } from 'react'
import { SafeListing, SafeReservation, SafeUser } from '../types'
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Heading from '../components/Heading';

interface PropertiesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}


function PropertiesClient({
    listings,
    currentUser
}: PropertiesClientProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('');

  
  const onDelete = useCallback(async (id:string) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/listings/${id}`);
      toast.success("Listings deleted successfully")
      router.refresh();
    } catch (error: any) {
        toast.error(error?.message)
    } finally {
      setDeletingId('')
    }
  },[router])
  return (
    <Container>
      <Heading 
        title='Properties'
        subTitle="List of your properties"
      />
        <div className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '>
          {
            listings.map((listing: any) => (
              <ListingCard 
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
              />
            ))
          }
        </div>
    </Container>
  )
}

export default PropertiesClient