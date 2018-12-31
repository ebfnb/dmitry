import React from 'react'

const Fallback=()=><div>...loading</div>
export default ({children})=>{return (
    <React.Suspense fallback={Fallback}>
        {children}
    </React.Suspense>
)}