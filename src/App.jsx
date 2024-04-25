import { useState , useCallback } from 'react'
import './App.css'

function App() {
  const [length, changelength] = useState(() => 8); // Corrected: Wrap initial value in a function
  const [number, setNumber] = useState(() => false); // Corrected: Wrap initial value in a function
  const [character, setCharacter] = useState(() => false); // Corrected: Wrap initial value in a function
  const [password, setPassword] = useState(""); // Corrected: Use password state to store password

  const passwordGenerator = useCallback(() => { // Corrected: Wrap useCallback around the function
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 0; i < length; i++) { // Corrected: Loop should run up to length, not <= length
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character]); // Corrected: Correct dependencies for useCallback

  return (
    <>
      <div className="w-full max-w-xs mx-auto mt-10 bg-white rounded-lg shadow-md text-red-500 bg-gray-300 overflow-hidden">
        <h1 className="text-center text-2xl font-bold p-4">Password Generator</h1>
        <div className="px-4 py-2">
          <input type="text" value={password} readOnly className="w-full h-12 text-lg px-3 rounded-md outline-none focus:outline-none" placeholder="Password" /> {/* Corrected: value should be password, not setPassword */}
          <button className="bg-red-500 text-white py-2 px-4 rounded-md ml-2" onClick={passwordGenerator}>Generate</button> {/* Corrected: Added onClick to trigger password generation */}
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) => { changelength(e.target.value) }} />
            <label>Length={length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={number} id='numberInput' onChange={(e) => { setNumber(e.target.checked) }} /> {/* Corrected: Changed onChange to setNumber */}
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={character} id='characterInput' onChange={(e) => { setCharacter(e.target.checked) }} /> {/* Corrected: Changed onChange to setCharacter */}
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
