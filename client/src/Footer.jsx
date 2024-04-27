import React from 'react'

export default function Footer() {
    return (
        <footer className=' bg-white border-t'>
            <div className="flex flex-wrap items-center justify-around">
                    <div className='flex items-center font-semibold text-gray-600'>
                    
                    <p>© 2024 Voyesta, Inc.</p>
                    </div>
                
                    <div className="w-auto p-8">
                        <ul className=" flex flex-wrap items-center">
                            <li className="p-5">
                                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                                    Privacy
                                </a>
                            </li>
                            <li className="p-5">
                                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                                    Terms
                                </a>
                            </li>
                            <li className="p-5">
                                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                                    Sitemap
                                </a>
                            </li>
                            <li className="p-5">
                                <a className="font-medium text-gray-600 hover:text-gray-700" href="#">
                                    Company details
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            
        </footer>

    );
}