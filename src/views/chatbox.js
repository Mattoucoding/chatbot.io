export default () => (`
    <section class="right">
        <div class="containerRight" id="conv1">
            <div class="containerRightTitle">
                <h1>Nom du bot</h1>
            </div>
            <ul class="chatbox">
                <li class="myTurn">
                    <div class="message-container">
                        <span class="message">User's message here</span>
                        <span class="timestamp">12:35 PM, 16 Feb 2024</span>
                    </div>
                </li>
                <li class="botTurn">
                    <h2 class="robot-name" style="font-size: 0.8rem;">Nom du bot</h2> <!-- Robot's name with smaller font size -->
                    <div class="message-container">
                        <span class="message">Bot's message here</span>
                        <span class="timestamp">12:30 PM, 16 Feb 2024</span>
                    </div>
                </li>
            </ul>
              <div class="containertextarea">
                  <input placeholder="Write here..." type="text" class="input">
                  <a href="" class="send"><i class="ri-send-plane-fill"></i></a>
              </div>
    </section>
`);
