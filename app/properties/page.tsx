import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import React from 'react'
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

interface PropertiesPageProps  {}

async function PropertiesPage() {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
        <ClientOnly>
            <EmptyState 
                title="Unauthorized"
                subTitle="Please login"
            />
        </ClientOnly>
    )
    }

    const listings = await getListings({userId: currentUser.id})
    
    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No trips found"
                    subTitle="Looks like you haven't reserved any trips"
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <PropertiesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
        
    )
}

export default PropertiesPage
