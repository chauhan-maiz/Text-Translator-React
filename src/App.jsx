import { useEffect, useState } from 'react'
import axios from 'axios';
function App() {
  const [input, setInput] = useState("")
  const [selectValue, setSelectValue] = useState("")
  const [result, setResult] = useState("")
  const [languages, setLanguages] = useState([])
  const [loader, setLoader] = useState(false)


  const options = {
    method: 'GET',
    url: 'https://list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com/languages',
    headers: {
      'x-rapidapi-key': '4ecc01e160msh7fe19bf8790924ap1bfa0bjsn71ec7293266e',
      'x-rapidapi-host': 'list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setLanguages(response?.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  })
  const handleTranslate = async () => {
    setLoader(true)
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '4ecc01e160msh7fe19bf8790924ap1bfa0bjsn71ec7293266e',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: `${input}`,
          source: 'en',
          target: `${selectValue}`,
          format: 'text'
        }
      };
      const response = await axios.request(options);
      setLoader(false)
      setResult(response?.data?.data?.translations?.[Number(0)]?.translatedText)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  return (
    <>
      <div className='h-screen w-screen bg-gradiant flex justify-center items-center'>
        <div className='bg-white w-xl rounded-lg m-auto shadow-lg flex flex-col justify-between items-center p-10 h-3/5'>
          <h1 className='text-3xl font-bold'>Text Translator</h1>
          <textarea name='input-text' className='border-2 border-black w-11/12 h-1/5  p-2 rounded-lg' placeholder='Enter text here...' onChange={(e) => setInput(e.target.value)}></textarea>
          <textarea className='border-2 border-black w-11/12 h-1/5  p-2 rounded-lg' value={result} readOnly placeholder='Translated text here...'></textarea>
          <div className='flex justify-between w-2/4'>
            <label htmlFor="" className='text-[1.2rem] font-semibold'>Convert Into</label>
            <select name="option" id="option" onChange={(e) => setSelectValue(e.target.value)} className='border-2 border-black rounded-lg px-2 w-33 h-8'>
              <option value="">Select</option>
              {
                languages.map((language, index) => (
                  <option key={index} value={language.code}>{language.name}</option>
                ))
              }
              <option value="hi">Hindi</option>
              <option value="gu">Gujarati</option>
            </select>
          </div>
          <button onClick={(handleTranslate)} className='bg-cyan-800 text-white px-4 py-2 rounded-lg w-[500px] hover:bg-cyan-600 text-2xl'>
            {loader ? (<div  class="glitch">Translating.....</div>) : "Translate"}
          </button>

        </div>
      </div>
    </>
  )
}

export default App
