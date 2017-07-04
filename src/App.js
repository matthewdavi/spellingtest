//@flow
import React, { Component } from 'react';
import './App.css';
import audio from './audio.svg';
import _ from 'lodash';
const server = ('http://104.236.237.48:8081/api/');
var hardWords =["abject","aberration","abjure","abnegation","abrogate","abscond","abstruse","accede","accost","accretion","acumen","adamant","admonish","adumbrate","adverse","advocate","affluent","aggrandize","alacrity","alias","ambivalent","amenable","amorphous","anachronism","anathema","annex","antediluvian","antiseptic","apathetic","antithesis","apocryphal","approbation","arbitrary","arboreal","arcane","archetypal","arrogate","ascetic","aspersion","assiduous","atrophy","bane","bashful","beguile","bereft","blandishment","bilk","bombastic","cajole","callous","calumny","camaraderie","candor","capitulate","carouse","carp","caucus","cavort","circumlocution","circumscribe","circumvent","clamor","cleave","cobbler","cogent","cognizant","commensurate","complement","compunction","concomitant","conduit","conflagration","congruity","connive","consign","constituent","construe","contusion","contrite","contentious","contravene","convivial","corpulence","covet","cupidity","dearth","debacle","debauch","debunk","defunct","demagogue","denigrate","derivative","despot","diaphanous","didactic","dirge","disaffected","discomfit","disparate","dispel","disrepute","divisive","dogmatic","dour","duplicity","duress","eclectic","edict","ebullient","egregious","elegy","elicit","embezzlement","emend","emollient","empirical","emulate","enervate","enfranchise","engender","ephemeral","epistolary","equanimity","equivocal","espouse","evanescent","evince","exacerbate","exhort","execrable","exigent","expedient","expiate","expunge","extraneous","extol","extant","expurgate","fallacious","fatuous","fetter","flagrant","foil","forbearance","fortuitous","fractious","garrulous","gourmand","grandiloquent","gratuitous","hapless","hegemony","heterogenous","iconoclast","idiosyncratic","impecunious","impetuous","impinge","impute","inane","inchoate","incontrovertible","incumbent","inexorable","inimical","injunction","inoculate","insidious","instigate","insurgent","interlocutor","intimation","inure","invective","intransigent","inveterate","irreverence","knell","laconic","largesse","legerdemain","libertarian","licentious","linchpin","litigant","maelstrom","maudlin","maverick","mawkish","maxim","mendacious","modicum","morass","mores","munificent","multifarious","nadir","negligent","neophyte","noisome","noxious","obdurate","obfuscate","obstreperous","officious","onerous","ostensible","ostracism","palliate","panacea","paradigm","pariah","partisan","paucity","pejorative","pellucid","penchant","penurious","pert","pernicious","pertinacious","phlegmatic","philanthropic","pithy","platitude","plaudit","plenitude","plethora","portent","potentate","preclude","predilection","preponderance","presage","probity","proclivity","profligate","promulgate","proscribe","protean","prurient","puerile","pugnacious","pulchritude","punctilious","quaint","quixotic","quandary","recalcitrant","redoubtable","relegate","remiss","reprieve","reprobate","rescind","requisition","rife","sanctimonious","sanguine","scurrilous","semaphore","serendipity","sobriety","solicitous","solipsism","spurious","staid","stolid","subjugate","surfeit","surreptitious","swarthy","tangential","tome","toady","torpid","travesty","trenchant","trite","truculent","turpitude","ubiquitous","umbrage","upbraid","utilitarian","veracity","vestige","vicissitude","vilify","virtuoso","vitriol","vituperate","vociferous","wanton","winsome","yoke","zephyr","wily","tirade"];
hardWords = _.shuffle(hardWords);
function grab(word){
    return fetch(server + word)
    .then(function(response){
      return response.json();
    })
      .then(function(json){
        console.log(json)
        return json;
      }).catch(function(error){
        console.log(error)
        return {audio: "http://media.merriam-webster.com/soundc11/e/error001.wav"}
      })
  }


class SpellBox extends React.Component{
submitGuess: Function;
buttonGuess: Function;
  constructor(props){
    super(props);
    this.state = {score: this.props.score, guess: "", readOnly:'', placeholder: 'enter your guess here', grade: '', gradeColor: ''}
  this.submitGuess = this.submitGuess.bind(this);
  this.buttonGuess = this.buttonGuess.bind(this);
  }
  makeGuess(event){
  this.setState({guess: event.target.value});
}
submitGuess(event){
  if(event.key === 'Enter'){
    if(this.state.guess === this.props.word){
      console.log(this.state.score)
      this.setState({guess: "", readOnly: 'disable', placeholder: this.props.word, grade: '✔', gradeColor: "#B6FE77"})
      this.props.updateScore();
    }
    else{
      this.setState({guess: "", readOnly: 'disable', placeholder: this.props.word, grade: '✗', gradeColor: "#FF1150"})

    }
    event.target.value = "";

  }
}
buttonGuess(event){
  if(this.state.guess === this.props.word){
      console.log(this.state.score)
      this.setState({readOnly: 'disable', placeholder: this.props.word, grade: '✔', gradeColor: "#B6FE77", guess: ""})
      this.props.updateScore();
    }
    else{
      this.setState({readOnly: 'disable', placeholder: this.props.word, grade: '✗', gradeColor: "#FF1150", guess: ""})

    }
}
  render(){
      return <div className="spellBox">
      <h1>Word #{this.props.index} <span style={{"color": this.state.gradeColor}}>{this.state.grade}</span></h1>
      <input autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" disabled={this.state.readOnly} onKeyDown={(event) => this.submitGuess(event)} onChange={(event) => this.makeGuess(event)} placeholder={this.state.placeholder} /> <br></br>
      <Sound  audio={this.props.audio} index={this.props.index}/>
      <button onClick={(event) => this.buttonGuess(event)} className="check">Check</button>
      </div>
  }
 }
class UserEntry extends React.Component{
 render(){
      return <section id="userEntry" onClick={this.props.whenClicked} className="menu" style={this.props.styling}>
      <input id="customWordEntry" placeholder="enter some words" onKeyDown={this.props.keydown} onChange={this.props.onChange}/> 
      <h2>to be added:</h2> <div>{this.props.wordList.toString()}</div>
      <button onClick={this.props.customRender}>Start</button>
      </section>
  }


}
class Sound extends React.Component{
  play(event){
    let audio = new Audio(this.props.audio);
    audio.play();
    console.log(audio)
  }
  render(){
    return <div>
    <img alt="audio" className="icon" height="35px" width="35px" src={audio} onClick={(event) => this.play(event)}></img> 
    </div>
    
  }
}

class ScoreBoard extends React.Component{
render(){
  if(this.props.score === 0){
    return <div></div>
  }
  else{ 
  return <div id="ScoreBoard">
  <h1>Score: {Math.round((this.props.score / this.props.size) * 100)}% </h1>

  </div>
      }
}
}

class SpellBoxes extends React.Component{
  render(){
    return <div>
    <div id="spell-Boxes">
  {this.props.userWords.map((word, index) => <SpellBox updateScore={this.props.updateScore} score={this.props.score} word={word.word} key={index} index={index+1} audio={word.audio}/>)}
</div>
  <ScoreBoard score={this.props.score} size={this.props.size}/>
    </div>
  }
}

class HardWordsMenu extends React.Component{
render(){
  return <div id="Hard-Words" onClick={this.props.whenClicked} className="menu">
  <section style={this.props.styling}>
  <Counter count={this.props.count} increase={this.props.increase} decrease={this.props.decrease} />
  <button onClick={this.props.buttonRender}>Start</button>
</section>
  </div>
}

}
class Counter extends React.Component{
  render(){
    return <div>
    <h2> <span id="minus" onClick={this.props.decrease} >-</span> <span id="count">{this.props.count} words</span> <span id="plus" onClick={this.props.increase}>+</span></h2>

    </div>
  }
}
class Selection extends React.Component{
constructor(props){
  super(props);
  this.state = {score: 0, count: 20, menuStyle: {"display": "inherit"}, hardWords: hardWords.slice(0,20), newWord: "", entryList: [], wordList: [], hardWordsDisplay:{"display":"inherit"}, userWordsDisplay:{"display": "none"}, hardHeading: {"textDecoration": "underline", "opacity": 1}, customHeading: {"textDecoration": "none"}};
}
clickUserWords(event){
  this.setState({hardWordsDisplay: {"display": "none"}, userWordsDisplay:{"display": "inherit"} , hardHeading: {"textDecoration": "none", "opacity": .5}, customHeading: {"textDecoration": "underline", "opacity": 1}});
  
}
clickHardWords(event){
  this.setState({hardWordsDisplay: {"display": "inherit"}, userWordsDisplay:{"display": "none"}, hardHeading: {"textDecoration": "underline", "opacity":1}, customHeading: {"textDecoration": "none", "opacity":.5}});
}

handleUserPress(event){
    if (event.key === 'Enter'){
      this.addtoList(event);
    }
}
updateScore(event){
  this.setState({score: this.state.score +1})
}
increaseCount(event){
  if(this.state.count < 50){ 
  this.setState({count: this.state.count + 5, hardWords: hardWords.slice(0,this.state.count+5)})
        }
  else if(this.state.count >= 50){
    this.setState({count: 5, hardWords: hardWords.slice(0,5)});
  }
}
decreaseCount(event){
  if(this.state.count <= 5){ 
  this.setState({count: 50, hardWords: hardWords.slice(0,299)})
        }
  else if(this.state.count >= 5){
    this.setState({count: this.state.count - 5, hardWords: hardWords.slice(0,this.state.count-5)});
  }
}
addtoList(event){
  var add = () => {this.setState({newWord: "", wordList: this.state.wordList.concat(this.state.newWord.split(/[ ,]/)).filter((item)=> item !== "")})}
      add();
      event.target.value = "";
    }

    addWord(event){
      this.setState({newWord: event.target.value});
      console.log("NEW WORD:", this.state.newWord)
    }

    customRender(event){
     let newList = this.state.entryList;
      var add = () => {this.setState({entryList: newList, menuStyle: {"display": "none"}})}
      let wordList = this.state.wordList.concat(this.state.newWord.split(/[ ,]/)).filter((item)=> item !== "");
        wordList.forEach(function(word){
        console.log("word", word)
        grab(word).then(function(sound){
        let newObj = {word: word, audio: sound.audio};
          newList.push(newObj);
          add();
      })
      })
    }
    hardWordsRender(event){
      console.log('words CLICKED!')
      let newList = this.state.entryList;
      var add = () => {this.setState({entryList: newList, menuStyle: {"display": "none"}})}
      this.state.hardWords.forEach(function(word){
        grab(word).then(function(sound){
        let newObj = {word: word, audio: sound.audio};
          newList.push(newObj);
          add();
      })
      })
  }
  

render(){
  return <div>
  <section style={this.state.menuStyle} id="chooseFormat">
    <div id="menuButtons">
  <span id="machineButton" onClick={(event) => this.clickHardWords(event)} className="menuWord" style={this.state.hardHeading} >SAT words</span>
  <span id="userButton" onClick ={(event) => this.clickUserWords(event)} className="menuWord" style={this.state.customHeading} >Custom</span>
    </div>
  <HardWordsMenu increase={(event) => this.increaseCount(event)} decrease={(event) => this.decreaseCount(event)} count={this.state.count} styling={this.state.hardWordsDisplay} buttonRender={(event) => this.hardWordsRender(event)} />
  <UserEntry heading={this.state.customHeading} whenClicked={(event) => this.clickUserWords(event)} styling={this.state.userWordsDisplay} customRender={(event) => this.customRender(event)} onChange={(event) => this.addWord(event)}userWords={this.state.entryList} keydown={(event) => this.handleUserPress(event)} wordList={this.state.wordList}/>
  </section>

  <SpellBoxes updateScore={(event) => this.updateScore(event)} size={this.state.entryList.length} score={this.state.score} wordList={this.state.wordList} userWords={this.state.entryList}/>


  </div>
}

}
class App extends Component {
  render() {
    return <div id="app">
    <h1 id="heading">{`<SpellingTest/>`}</h1>
    <Selection/>
    </div>
  }
}

export default App;
