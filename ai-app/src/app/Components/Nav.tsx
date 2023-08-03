"use client";
import React, { useEffect, useState } from "react";
import Link from "../../../node_modules/next/link";

const Nav = () => {


  const [isCurrent,setIsCurrent] = useState(false)

  useEffect(()=>{
    const currentUrl = window.location.href;
    if(currentUrl === "http://localhost:3000/create-post"){
      setIsCurrent(true)
    }
  },[])


  return (
    <>
      <div className="navbar bg-base-800 ">
        <div className="flex-1">
          <button className="btn btn-ghost normal-case text-xl">OpenAI</button>
        </div>
        {isCurrent ? (
          <>
            {" "}
            <Link href="/" onClick={()=>{setIsCurrent(false)}}>
              <button className="btn hover:scale-105 duration-300 ease-in-out btn-primary">
                Back
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/create-post" onClick={()=>{setIsCurrent(true)}}>
              <button className="btn hover:scale-105 duration-300 ease-in-out btn-primary">
                create
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
