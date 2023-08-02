const APIkey ="950d3f80fc0e400fb43b97b0484bf90f"
const ReqID ="4ffcac1c-b2fc-48ba-bd6d-b69d9942995a"
const projectName="gpt-07"
const deploymentName="personal01-m"
const APIurl = "https://alex-luis.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview"

function sendMessage(event) {
  if (event.keyCode === 13) {
    var userInput = document.getElementById("userInput");
    var message = userInput.value;

    // Clear the input field
    userInput.value = "";

    // Display user message
    displayMessage("user", message);

    // Send message to the chatbot
    sendMessageToBot(message);
  }
}

function sendMessageToBot(message) {
  // Create a new XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("POST", APIurl);
  xhr.setRequestHeader("Ocp-Apim-Subscription-Key", APIkey);
  xhr.setRequestHeader("Apim-Request-Id", ReqID);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      // console.log(response)
      var topIntent = response.result.prediction.topIntent;
      var reply
      switch (topIntent) {
    case '個人簡介':
        reply = "我是一個人工智能助手，可以提供各種相關的資訊和回答問題。請問有什麼我可以幫助您的？";
        break;
    case '再見':
        reply = "再見！如果有任何其他問題，歡迎隨時向我詢問。祝您有美好的一天！";
        break;
    case '可用性問題':
        reply = "我們的系統每週工作7天，可以同時處理多個請求。回應時間通常在數秒內。如果您有特定的時間需求，請告訴我們。";
        break;
    case '合作機會':
        reply = "我們對於與其他公司或團隊合作非常感興趣。如果您有任何合作機會或想法，請告訴我們詳細資訊，我們可以討論更多細節。";
        break;
    case '專案作品':
        reply = "我們有許多專案作品，包括網站開發、應用程式開發、人工智能專案等。如果您對特定的領域或作品感興趣，請告訴我們，我們可以提供相關資訊和案例研究。";
        break;
    case '打招呼':
        reply = "您好！我很高興能夠和您交流。有什麼我可以幫助您的？";
        break;
    case '技術堆疊':
        reply = "我們使用多種程式語言和框架，包括Python、JavaScript、React、Node.js等。我們也使用雲端平台和服務，如AWS、Azure等。如果您對具體的技術堆疊有任何問題，請告訴我們，我們可以提供更多資訊。";
        break;
    case '授權和使用權':
        reply = "我們的服務有不同的授權模式，具體取決於您的需求和合約。我們對用戶資料的保護非常重視，並遵守相關的隱私政策和規定。如果您有關於授權和使用權的具體問題，請告訴我們，我們可以提供相關資訊。";
        break;
    case '獲獎或成就':
        reply = "我們曾獲得過多個獎項和榮譽，並在專業領域取得了一些成就。我們的作品和專案獲得了廣泛的肯定和評價。如果您對我們的獲獎或成就有興趣，請告訴我們，我們可以分享更多相關資訊。";
        break;
    case '社交媒體連結':
        reply = "您可以在我們的網站上找到我們的社交媒體連結，我們在那裡分享專業內容、最新消息和活動資訊。歡迎您關注我們的社交媒體帳號以保持最新動態！";
        break;
    case '網站功能':
        reply = "我們的網站提供多種主要功能，包括資訊查詢、用戶註冊、專案展示、聯繫方式等。我們也致力於提供用戶支援和客服服務，以確保您有良好的使用體驗。如果您對特定的網站功能有任何問題，請告訴我們，我們會竭誠為您解答。";
        break;
    case '部落格或文章':
        reply = "我們有自己的部落格和寫作平台，我們在那裡分享各種專業內容、技術教學和行業趨勢等。我們的文章主要探討與我們的專業領域相關的主題。如果您對特定的部落格或文章有興趣，請告訴我們，我們可以提供相關連結和資訊。";
        break;
    default:
        reply = "很抱歉，我無法理解您的請求。請再說一次或提供更多細節，我會盡力為您提供幫助。";
        break;
}


      // Display bot response
      displayMessage("bot", reply);
    }
  };

  // Set up the request payload
  var payload = JSON.stringify({
    "kind": "Conversation",
    "analysisInput": {
      "conversationItem": {
        "id": "1",
        "text": message,
        "modality": "text",
        "participantId": "user1"
      }
    },
    "parameters": {
      "projectName": projectName,
      "verbose": true,
      "deploymentName": deploymentName,
      "stringIndexType": "TextElement_V8"
    }
  });

  // Send the request
  xhr.send(payload);
}

function displayMessage(sender, message) {
  var chatbox = document.getElementById("chatbox");
  var newMessageContainer = document.createElement("div");
  var newMessage = document.createElement("p");
  newMessage.classList.add("chat-message");
  newMessage.classList.add(sender);
  newMessage.innerText = message;

  // Set the message style based on the sender
  if (sender === "user") {
    newMessageContainer.classList.add("user-message-container");
    newMessageContainer.appendChild(newMessage);
  } else if (sender === "bot") {
    newMessageContainer.classList.add("bot-message-container");
    var botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.appendChild(newMessage);
    newMessageContainer.appendChild(botMessage);
  }

  chatbox.appendChild(newMessageContainer);

  // Scroll to the bottom of the chatbox
  chatbox.scrollTop = chatbox.scrollHeight;
}