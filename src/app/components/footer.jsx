"use client"
export default function Footer(){
    const currentYear = new Date().getFullYear();
    return(
        <>
        <div className="bg-gray-900 flex h-28 justify-center items-center">
            <h2 className="text-center text-lg text-white "> © {currentYear} FlowNex. All rights reserved.</h2>

        </div>
        </>
    )
}