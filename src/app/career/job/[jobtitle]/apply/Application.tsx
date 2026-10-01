
import { JobApplicationForm } from '@/components/shared/form'
import { LeftArrow } from '@/icons'
import Link from 'next/link'
import React from 'react'

const Application = ({jobTitle}:{jobTitle:string}) => {
    return (
        <section className='px-[4.5vw]'>
            <div className='flex items-center'>
                <Link href='/career' className='flex cursor-pointer items-center w-[20%] max-md:hidden'>
                    <LeftArrow />
                    <p className='text-small !font-normal text-[#00000099]'>&nbsp; Go Back</p>
                </Link>
                <div className=' w-[60%] max-md:w-full'>
                    <h1 className='sub-heading text-center' >Job Application</h1>
                    
                </div>
            </div>
            <h2 className='para my-3 text-center'>{jobTitle.split('-').join(' ')}</h2>
            <section className='flex justify-center items-center max-lg:my-5 my-24'>
                <section className='w-[70%] max-lg:w-full flex justify-center items-center'>
                    <JobApplicationForm />
                </section>
            </section>
        </section>
    )
}

export default Application
