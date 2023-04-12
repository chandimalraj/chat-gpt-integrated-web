import React, { useState } from "react";
import search from "../assets/Search.png";
import {Configuration, OpenAIApi} from "openai"


export default function Home() {

  const [searchData, setSearchData] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");

  const api_key = process.env.REACT_APP_API_KEY
  
  const openai = new OpenAIApi(

    new Configuration(
        {
            apiKey : api_key
        }
    )
  )

  const submit = ()=>{

    openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages : [
            {
                role:"user",
                content:searchData
            }
        ]
    
      }).then((res)=>{
      console.log(res.data.choices[0].message.content)
      const data = res.data.choices[0].message.content;
      setData(data)
      setShow(true)
      }).catch((err)=>{
      setData("there is an error...")
      setShow(true)
      })
  }

  return (
    <div className="App">
      <div className="searchbar-container">

        <input onChange={(e)=>{
          setSearchData(e.target.value)
        }} />

        <button className="btn" onClick={submit}>
          <img src={search} className="btn-img" />
        </button>

      </div>

      {show == true && <div className="details-container">{data}</div>}
    </div>
  );
}
