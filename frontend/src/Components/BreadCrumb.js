import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const BreadCrumb = () => {
    // defining constants

    const location = useLocation();
    const [pathname, setPathname] = useState(["home"]);

    // setting pathname
    useEffect(() => {
        let array = pathname;
        let path = location.pathname.split("/");
        path = path.filter(e=> {return e !== ""})
        array = array.concat(path)
        setPathname(array);
    }, [])
    
  return (
    <div>
        {
            (pathname.length) ? 
            pathname.map((path,index)=>{
                return <a href={index === 0 ? "/" : location.pathname} className=' capitalize' key={index}>{(index !== pathname.length-1) ? path + " > " : path}</a>
            })
            :
            ""
        }
    </div>
  )
}

export default BreadCrumb