import { useState } from 'react'
import './App.css'
import { checkArticle } from './utils.js'

function App() {
  const [article, setArticle] = useState('')
  const [warnWords, setWarnWords] = useState([]) // 敏感词汇
  
  const onkeyup = (e) => { 
    setArticle(e.target.value)
  }
  // 检测文案
  const toCheck = () => {
    const res = checkArticle(article)
    setWarnWords(res)
    console.log('article', res)
  }

  const renderWarnWords = (warnWords) => {
    if (warnWords.length ===0) {
      return <div className="no-warn-word-item">暂无敏感词汇</div>
    }
    return warnWords.map((item, index) => {
      return (
        <span className="warn-word-item" key={index}>{item}</span>
      )
    })
  }
  return (
    <>
      <div className='check-box'>
        <h3 className="title">敏感词汇检测</h3>
       <textarea
        name=""
        id=""
        cols="80"
        rows="14"
        className='text-area'
        value={article}
        onInput={onkeyup}
       ></textarea>
       <div className="btn-wrap">
          <button className='btn' onClick={toCheck}>检测</button>
       </div>
      </div>
      <div className="warn-words">
        <h4 className="title">敏感词汇</h4>
        <div className="warn-word-box">
          {
            renderWarnWords(warnWords)
          }
        </div>
      </div>
    </>
  )
}

export default App
