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
    setText1("ssh guest@renisal.me")
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
          setText1("ssh guest@renisal.me")
          setText2("guest@renisal.me's password:");
          setText3("Access Granted!")
        }
        const CommandArea = document.getElementById("command");
        if (CommandArea) {
          previousCommand = CommandArea.value
          setprevusedCommand(prevArray => [...prevArray, "guest@renisal.me:~$ " + previousCommand])
          if (CommandArea.value === "github") {
            window.open("https://github.com/montymahato", '_blank');
          }
          else if (CommandArea.value === "mysite") {
            window.open("https://renisal.me", '_blank');
          }
          else if (CommandArea.value === "source") {
            window.open("https://github.com/montymahato/mterminal-portfolio", '_blank');
          }
          CommandArea.value = "";
        }
      }

    });

    Typewriter("ssh guest@renisal.me", 100, setText1)

    setTimeout(() => {
      setText2("guest@renisal.me's password:▮");
    }, 3000);

    setTimeout(() => {
      Typewriter("", 100, setText4, true, 2500);
    }, 4300);

    setTimeout(() => {
      setText3("Connecting to guest@renisal.me...");
    }, 4300);

    setTimeout(() => {
      setText2("guest@renisal.me's password:");
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

        {Text3.includes("Access") ? <span>Welcome! this project is currently under development.</span> : ""}
        {Text3.includes("Access") ? <span>What is this? It's a terminal simulation, initially created it as a portfolio <a href="https://renisal.me">(https://renisal.me)</a></span> : ""}<br />
        {Text3.includes("Access") ? <span><span style={{ color: "skyblue" }}>Available Commands:</span></span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>General: </span> about, discord, play, projects, hacksim, clear</span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>Links:</span> github, mysite, source</span> : ""}

        <br></br>
        {Text3.includes("Access") ? <span>Thank you for visiting!◝(ᵔᵕᵔ)◜</span> : ""}
        <br></br>
        <ul className='previousCommands' id='console23'>
          {prevusedCommand.map((item, index) => {
            if (item.match(new RegExp(`\\b${"discord"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br>My discord: <span style={{ color: "rgb(68, 110, 250)" }}>@renisal</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"github"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened my GitHub profile in a new tab: https://github.com/montymahato</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"projects"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                <br></br>  <label for="mcq">Select another project to view:</label>
                <div class="mcq-wrapper"><br></br>
                  <ul id="mcq" class="mcq">
                    <li class="mcq-option" tabindex="0" data-value="regex"><a href="https://montymahato.github.io/regex-validator" target='_blank' rel="noreferrer">RegEx Validator ↗</a></li>
                    <li class="mcq-option" tabindex="1" data-value="luap"><a href="https://montymahato.github.io/lua-pattern-tester" target='_blank' rel="noreferrer">Lua Pattern Tester ↗</a></li>
                    <li class="mcq-option" tabindex="2" data-value="apple"><a href="https://montymahato.github.io/apple-website-clone" target='_blank' rel="noreferrer">Apple Website Clone ↗</a></li>
                    <li class="mcq-option" tabindex="3" data-value="crypto"><a href="https://montymahato.github.io/cryptodata-retriever" target='_blank' rel="noreferrer">Cryptodata Retriever ↗</a></li>
                    <li class="mcq-option" tabindex="4" data-value="sampserver"><a href="https://github.com/montymahato/samp-mumbai-rp" target='_blank' rel="noreferrer">SA-MP RP Server Script ↗</a></li>
                    <li class="mcq-option" tabindex="5" data-value="passgen"><a href="https://montymahato.github.io/password-generator" target='_blank' rel="noreferrer">Password Generator ↗</a></li>
                    <li class="mcq-option" tabindex="6" data-value="uif"><a href="https://github.com/montymahato/uif-discord-plugin" target='_blank' rel="noreferrer">UIF Discord Rich Presence ↗</a></li>
                    <li class="mcq-option" tabindex="7" data-value="discordbot"><a href="https://github.com/montymahato/purposebot" target='_blank' rel="noreferrer">Discord Bot ↗</a></li><br></br>
                  </ul>
                </div>
              </div>
            }
            else if (item.match(new RegExp(`\\b${"mysite"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened my personal website in a new tab: https://renisal.me</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"source"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened the source code of this site in a new tab: https://github.com/montymahato/mterminal-portfolio</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"hacksim"}\\b`, 'g'))) {
              return <div><HackerSimulator></HackerSimulator><br></br>
                To abort, use aborthack
              </div>
            }
            else if (item.match(new RegExp(`\\b${"aborthack"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                bash: {item.replace("guest@renisal.me:~$", '')}: ERROR - Script terminated by the user</div>;
            }
            else if (item.match(new RegExp(`\\b${"play"}\\b`, 'g'))) {
              if (item.match(new RegExp(`\\b${"play shutdown"}\\b`, 'g')) || item.match(new RegExp(`\\b${"play 1"}\\b`, 'g'))) {
                return <div><span style={{color: "hotpink"}}>Now playing:</span> BLACKPINK - ‘Shut Down’ M/V
                  <YouTube link={"https://www.youtube.com/embed/POe9SOEKotk?autoplay=1"} /></div>
              }
              else if (item.match(new RegExp(`\\b${"play flower"}\\b`, 'g')) || item.match(new RegExp(`\\b${"play 2"}\\b`, 'g'))) {
                return <div><span style={{color: "hotpink"}}>Now playing:</span> JISOO - ‘꽃(FLOWER)’ M/V
                  <YouTube link={"https://www.youtube.com/embed/YudHcBIxlYw?autoplay=1"} /></div>
              }
              else {
                return <div><li key={index}>{item}</li><br></br>
                  <span style={{color: "hotpink"}}>Available music:</span><br></br>
                  1. shutdown (by BLACKPINK)<br></br>
                  2. flower (by JISOO)<br></br>
                  To play a song, use <strong>play number/songname</strong> (e.g. play 1 or play shutdown)<br></br><br></br></div>
              }
            }
            else if (item.match(new RegExp(`\\b${"clear"}\\b`, 'g'))) {
              return setprevusedCommand([]);
            }
            else if (item.match(new RegExp(`\\b${"about"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                <div className='aboutme'><br></br>
                  Hi, nice to meet you. I'm Monty, a 19 years old CS student from India. I'm a casual programmer (doing it just for fun)
                  <br></br><br></br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget nisl a ligula tristique consequat. Nullam non efficitur mi. Sed nec dapibus elit. Quisque luctus, nunc et volutpat tristique, odio elit vestibulum odio, id eleifend lectus justo non dolor. Praesent vel libero id arcu bibendum bibendum
                  <br></br><br></br>
                </div>
              </div>
            } else {
              return <div><li key={index}>{item}</li>
                bash: {item.replace("guest@renisal.me:~$", '')}: command not found</div>;
            }
          })}
        </ul>
        {Text3.includes("Access") ? <span className='commands'><span className='userPrefix'>guest@renisal.me:~$</span> <input type="text" id="command" name="command" autoFocus></input></span> : ""}
      </div>
    </div>
  );
}

export default Terminal;
