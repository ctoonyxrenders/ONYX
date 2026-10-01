import React from 'react'
import ClientReviews from './ClientReviews'
import AvailablePositions from './AvailablePositions'
import CareersSEO from '@/components/seo/CareersSEO'

function page() {
    return (
        <>
            <CareersSEO />
            <main className='flex flex-col gap-6'>
                <ClientReviews />
                <AvailablePositions />
            </main>
        </>
    )
}

export default page