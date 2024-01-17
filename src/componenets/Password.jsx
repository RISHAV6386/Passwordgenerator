import React, { useCallback, useEffect, useState } from 'react'
import '../style/Password.css'
import { useRef } from 'react'

const Password = () => {
    const [length,setLength]=useState(8)
    const [number,setNumber]=useState(false)
    const [char,setChar]=useState(false)
    const[Password,setPassword]=useState("")
    let passwordgenerator= useCallback(()=>{
        let pass=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(number) str+="0123456789"
        if(char) str+="@#$%&*^.?!"
        for(let i=1;i<=length;i++){
          let char = Math.floor(Math.random()*str.length+1);
          pass+=str.charAt(char)
        }
        setPassword(pass)
    },[length,number,char,setPassword])


    useEffect(()=>{
      passwordgenerator()
    },[length,number,char,setPassword,passwordgenerator])

    const PasswordRef=useRef(null)
    const copypass=useCallback(()=>{
      PasswordRef.current?.select()
        window.navigator.clipboard.writeText(Password)
    },[Password])
    

  return (<>  
  <div id='font'  >PASSWORD GENERETOR
    <input id='pass' type='text' placeholder='PASSWORD' value={Password} ref={PasswordRef} readOnly></input><button onClick={copypass}>COPY</button>
    <div className='flex text-sn gap-x-2'>
      <div className='flex items-center gap-x-1' >
        <input id='range' type='range' min={6} max={100} value={length}
        onChange={(e)=>{setLength(e.target.value)}} 
        /><label id='count'>Length:{length}</label>
        <input type='checkbox' defaultChecked={number} id="numberinput"
        onChange={()=>{
          setNumber((prev)=>!prev)
        }}
        /><label id='number'>NUMBERS</label>
        <input type='checkbox' defaultChecked={char} id="charinput"
        onChange={()=>{
          setChar((prev)=>!prev)
        }}
        /><label id='char'>CHARACTERS</label>
      </div>

    </div>
  </div>
    </>
  )
}

export default Password