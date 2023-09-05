import { useState, useCallback, useEffect, useRef} from "react"
const App = () =>  {
  const [length, setLength] = useState(8);
  const [numbersAllowed , setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // using the useRef hook 
  const passwordRef = useRef(null)
  // creating our generate Password method and runing it when
  // dependencies changes
  const passwordGenerator = useCallback( ()=>{
    let password = ""
    let dummyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed) dummyString+="1234567890"
    if(charactersAllowed) dummyString += '$@*%{}[]()!'

    // Now creating our password that will pick the random items from our dummmy string
    for (let i = 1; i <= length; i++) {
      // creating our password here using the random
      let char = Math.floor(Math.random() * dummyString.length + 1); // this will get one random index of the string 
      password += dummyString.charAt(char) // this will have the character at that index char of dummyString 
      
    }
    // Now updating the password with the method setPassword
    setPassword(password)
  }, [numbersAllowed, charactersAllowed, length, setPassword])

  
  /* TODO: Use Callback to Optimize it more using the variables 
    Usecallback memorizes the data more setPassword is sent to optimized it more 
  */

  // Functionality for copy password
  const copyPasswordToClipBoard = useCallback(()=>{
    // using the passwordRef
    // This below line will show using the selected area 
    passwordRef.current?.select();
    // this below will only select the value from the index 0 to index 30 more optimization
    passwordRef.current?.setSelectionRange(0, 30)
    // copying the password using the window object
    window.navigator.clipboard.writeText(password)
  },[password])


  // Using the use effect to call the useCallback function
  useEffect(()=>{
    passwordGenerator();
  },[length, numbersAllowed, charactersAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 py-4">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
            />
            <button 
              className="p-3 bg-blue-500 text-white hover:bg-blue-600" 
              onClick={copyPasswordToClipBoard}>
                copy
            </button>
        </div>
        {/* classes */}
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range" 
              min={8}
              max={30}
              value={length} 
              className="cursor-pointer" 
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={numbersAllowed} 
              id="numberInput" 
              className="cursor-pointer"
              onChange={()=> setNumbersAllowed((prev)=> !prev)}
            />
            <label htmlFor="numbersInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={charactersAllowed} 
              id="numberInput" 
              className="cursor-pointer"
              onChange={()=> setCharactersAllowed((prev)=> !prev)}
            />
            <label htmlFor="charactersAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
