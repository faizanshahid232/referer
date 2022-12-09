import React from 'react';

const SuccessFailure = () => {
    return (
        <>
        <div className='bg-[#181b1d] relative flex flex-col items-center min-h-screen overflow-hidden h-full'>
            <div className='py-4'>
                <img className='h-[30px]' src='/egold_logo_new.png'/>
            </div>
                <div className='flex flex-col items-center p-[30px] bg-[#25252f] b-rad rounded-[20px] my-5 w-[400px] border-[#6969ae] border-solid border-[2px]'>
                    <h3 className='text-white font-bold text-[16px] mb-5 text-center'>Email Verification Successfully</h3>
                    <img className='h-28' src='/success.png' />
                </div>
        </div>
        </>
    );
}

export default SuccessFailure;