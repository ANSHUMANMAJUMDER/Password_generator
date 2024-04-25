import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(() => 8);
  const [includeNumber, setIncludeNumber] = useState(() => false);
  const [includeCharacter, setIncludeCharacter] = useState(() => false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumber) characters += "0123456789";
    if (includeCharacter) characters += "!@#$%^&*()_+";

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, includeNumber, includeCharacter]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        console.log('Password copied to clipboard!');
      })
      .catch(() => {
        console.log('Failed to copy password to clipboard.');
      });
  };

  return (
    <>
      <div className="w-full max-w-xs mx-auto mt-10 bg-white rounded-lg shadow-md text-red-500 bg-gray-300 overflow-hidden">
        <h1 className="text-center text-2xl font-bold p-4">Password Generator</h1>
        <div className="px-4 py-2">
          <input type="text" value={password} readOnly className="w-full h-12 text-lg px-3 rounded-md outline-none focus:outline-none" placeholder="Password" />
          <button className="bg-red-500 text-white py-2 px-4 rounded-md ml-2" onClick={copyToClipboard}>Copy</button> {/* Added copy button */}
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2" onClick={generatePassword}>Generate</button>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={includeNumber} id='numberInput' onChange={(e) => setIncludeNumber(e.target.checked)} />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={includeCharacter} id='characterInput' onChange={(e) => setIncludeCharacter(e.target.checked)} />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
