import { useState, useEffect } from 'react';
import '../css/terminal.css';
import HackerSimulator from './HackSimulator';
import YouTube from './YouTube';

const Typewriter = (text, delay, func, Spinner, spinTime) => {

  const startTime = new Date();
  let Output = '';
  let index = 0;
  text = Spinner ? "⠋⠙⠹⠸⠼⠴⠦⠧⠇" : text;

  const intervalId = setInterval(() => {

    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        return clearInterval(intervalId)
      }
    });

    const endTime = new Date();
    if (index < text.length) {
      Output += text[index];
      index += 1;

      if (Spinner) {

        func(text[index])
        setTimeout(function () {
          func(text[index + 1])
        }, 700);
        if (index === 8) {
          if (endTime.getTime() - startTime.getTime() < spinTime) {
            index = 0;
          }
          else {
            clearInterval(intervalId)
          }
        }
      }
      else {
        func(Output);
      }
    }
    else {
      return clearInterval(intervalId)
    }
  }
    , delay);

}

function Terminal() {

  const [Text1, setText1] = useState('');
  const [Text2, setText2] = useState('');
  const [Text3, setText3] = useState('');
  const [Text4, setText4] = useState('');
  const cursor = '▮';
  let previousCommand;

  const [prevusedCommand, setprevusedCommand] = useState([])

  function SkipIntro() {
    let id = setTimeout(() => { }, 0);
    while (id--) {
      clearTimeout(id);
    }

    id = setInterval(() => { }, 0);
    while (id--) {
      clearInterval(id);
    }
    setText1("ssh guest@reiynstudio.ink")
    setText3("Access Granted!")
  }

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (!Text3.includes("Access")) {
          let id = setTimeout(() => { }, 0);
          while (id--) {
            clearTimeout(id);
          }

          id = setInterval(() => { }, 0);
          while (id--) {
            clearInterval(id);
          }
          setText1("ssh guest@reiynstudio.ink")
          setText2("guest@reiynstudio.ink's password:");
          setText3("Access Granted!")
        }
        const CommandArea = document.getElementById("command");
        if (CommandArea) {
          previousCommand = CommandArea.value
          setprevusedCommand(prevArray => [...prevArray, "guest@reiynstudio.ink:~$ " + previousCommand])
          if (CommandArea.value === "github") {
            window.open("https://github.com/reiyncode", '_blank');
          }
          else if (CommandArea.value === "mysite") {
            window.open("https://reiynstudio.ink", '_blank');
          }
          else if (CommandArea.value === "source") {
            window.open("https://github.com/reiyncode/terminal-portfolio", '_blank');
          }
          CommandArea.value = "";
        }
      }

    });

    Typewriter("ssh guest@reiynstudio.ink", 100, setText1)

    setTimeout(() => {
      setText2("guest@reiynstudio.ink's password:▮");
    }, 3000);

    setTimeout(() => {
      Typewriter("", 100, setText4, true, 2500);
    }, 4300);

    setTimeout(() => {
      setText3("Connecting to guest@reiynstudio.ink...");
    }, 4300);

    setTimeout(() => {
      setText2("guest@reiynstudio.ink's password:");
      setText3("> Access granted.");
    }, 7300);

  }, []);

  return (
    <div className="terminal">
      <div className='console'>
        <span className='userPrefix'>user@localhost:~$
          <span style={{ color: "white", marginLeft: "8px" }}>{Text1}{Text1.length === 20 ? "" : cursor}</span>
        </span>

        {Text3.includes("Access") ? "" : <span id='skipButton' onClick={SkipIntro}>Press Enter or Click Here to Skip</span>}
        {Text2}
        <span> {Text4} <span style={{ color: Text3.includes("Access") ? ("yellow") : "" }} >{Text3}</span></span>
        <br />
        {Text3.includes("Access") ? (
  <pre>
    {`              _______                  _             _ 
             |__   __|                (_)           | |
       _ __ ___ | | ___ _ __ _ __ ___  _ _ __   __ _| |
      | '_ \` _ \\| |/ _ \\ '__| '_ \` _ \\| | '_ \\ / _\` | |
      | | | | | | |  __/ |  | | | | | | | | | | (_| | |
      |_| |_| |_|_|\\___|_|  |_| |_| |_|_|_| |_|\\__,_|_|
                                                
    `}
  </pre>
) : null}

        {Text3.includes("Access") ? <span>What is this? It's a terminal simulation portfolio template. <a href="https://reiynstudio.ink">(https://reiynstudio.ink)</a></span> : ""}<br />
        {Text3.includes("Access") ? <span><span style={{ color: "skyblue" }}>Available Commands:</span></span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>General: </span> about, discord, radio, projects, hacksim, clear</span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>Links:</span> github, mysite, source</span> : ""}

        <br></br>
        {Text3.includes("Access") ? <span>Thank you for visiting!◝(ᵔᵕᵔ)◜</span> : ""}
        <br></br>
        <ul className='previousCommands' id='console23'>
          {prevusedCommand.map((item, index) => {
            if (item.match(new RegExp(`\\b${"discord"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br>My discord: <span style={{ color: "rgb(68, 110, 250)" }}>@iamreiyn</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"github"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened my GitHub profile in a new tab: https://github.com/reiyncode</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"projects"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                <br></br>  <label for="mcq">Select another project to view:</label>
                <div class="mcq-wrapper"><br></br>
                  <ul id="mcq" class="mcq">
                    <li class="mcq-option" tabindex="0" data-value="regex"><a href="https://reiyncode.github.io/regex-validator" target='_blank' rel="noreferrer">RegEx Validator ↗</a></li>
                    <li class="mcq-option" tabindex="1" data-value="luap"><a href="https://reiyncode.github.io/lua-pattern-tester" target='_blank' rel="noreferrer">Lua Pattern Tester ↗</a></li>
                    <li class="mcq-option" tabindex="2" data-value="apple"><a href="https://reiyncode.github.io/apple-website-clone" target='_blank' rel="noreferrer">Apple Website Clone ↗</a></li>
                    <li class="mcq-option" tabindex="4" data-value="sampserver"><a href="https://github.com/reiyncode/samp-mumbai-rp" target='_blank' rel="noreferrer">SA-MP RP Server Script ↗</a></li>
                    <li class="mcq-option" tabindex="5" data-value="passgen"><a href="https://reiyncode.github.io/password-generator" target='_blank' rel="noreferrer">Password Generator ↗</a></li>
                  </ul>
                </div>
              </div>
            }
            else if (item.match(new RegExp(`\\b${"mysite"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened my personal website in a new tab: https://reiynstudio.ink</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"source"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened the source code of this site in a new tab: https://github.com/reiyncode/terminal-portfolio</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"hacksim"}\\b`, 'g'))) {
              return <div><HackerSimulator></HackerSimulator><br></br>
                To abort, use aborthack
              </div>
            }
            else if (item.match(new RegExp(`\\b${"aborthack"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                bash: {item.replace("guest@reiynstudio.ink:~$", '')}: ERROR - Script terminated by the user</div>;
            }
            else if (item.match(new RegExp(`\\b${"radio"}\\b`, 'g'))) {
              if (item.match(new RegExp(`\\b${"play starboy"}\\b`, 'g')) || item.match(new RegExp(`\\b${"radio 1"}\\b`, 'g'))) {
                return <div><span style={{color: "hotpink"}}>Now playing:</span> The Weeknd - ‘Starboy’ M/V
                  <YouTube link={"https://www.youtube.com/embed/34Na4j8AVgA?autoplay=1"} /></div>
              }
              else if (item.match(new RegExp(`\\b${"radio espresso"}\\b`, 'g')) || item.match(new RegExp(`\\b${"radio 2"}\\b`, 'g'))) {
                return <div><span style={{color: "hotpink"}}>Now playing:</span> Sabrina Carpenter - ‘Espresso’ M/V
                  <YouTube link={"https://www.youtube.com/embed/eVli-tstM5E?autoplay=1"} /></div>
              }
              else {
                return <div><li key={index}>{item}</li><br></br>
                  <span style={{color: "hotpink"}}>Available music:</span><br></br>
                  1. starboy (by The Weeknd)<br></br>
                  2. espresso (by Sabrina Carpenter)<br></br>
                  To play a song, use <strong>radio number/songname</strong> (e.g. radio 1 or radio starboy)<br></br><br></br></div>
              }
            }
            else if (item.match(new RegExp(`\\b${"clear"}\\b`, 'g'))) {
              return setprevusedCommand([]);
            }
            else if (item.match(new RegExp(`\\b${"about"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                <div className='aboutme'><br></br>
                  Hi. I'm Reiyn, nice to meet you. 
                  <br></br><br></br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget nisl a ligula tristique consequat. Nullam non efficitur mi. Sed nec dapibus elit. Quisque luctus, nunc et volutpat tristique, odio elit vestibulum odio, id eleifend lectus justo non dolor. Praesent vel libero id arcu bibendum bibendum
                  <br></br><br></br>
                </div>
              </div>
            } else {
              return <div><li key={index}>{item}</li>
                bash: {item.replace("guest@reiynstudio.ink:~$", '')}: command not found</div>;
            }
          })}
        </ul>
        {Text3.includes("Access") ? <span className='commands'><span className='userPrefix'>guest@reiynstudio.ink:~$</span> <input type="text" id="command" name="command" autoFocus></input></span> : ""}
      </div>
    </div>
  );
}

export default Terminal;
