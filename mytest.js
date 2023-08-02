function handleTopIntent(topintent) {
    switch (topintent) {
        case "註冊帳戶":
            return "歡迎您註冊帳戶！請按照網站上的指示進行註冊流程。";
        case "取消訂單":
            return "您想取消訂單嗎？請提供訂單編號，我們將會幫您處理。";
        case "商品搜尋":
            return "請問您想要搜尋什麼商品？請告訴我您想找的商品類型或名稱。";
        case "客戶服務":
            return "如果您遇到了問題，我們的客戶服務團隊將竭誠為您提供幫助。";
        case "支付方式":
            return "在我們的平台上，您可以使用多種支付方式，包括信用卡、銀行轉帳等。";
        case "查詢訂單":
            return "請提供您的訂單編號，我們將為您查詢訂單的最新狀態。";
        case "產品提問":
            return "如果您對產品有任何問題或疑問，請隨時向我們詢問。";
        case "聯絡我":
            return "如果您需要聯絡我們，請在網站上提供您的聯繫方式，我們將盡快與您聯繫。";
        case "貨運方式":
            return "我們提供多種貨運方式，您可以在結帳時選擇最適合您的運送方式。";
        case "退換貨流程":
            return "如果您需要辦理退換貨，請參考網站上的退換貨政策。";
        case "部落格或文章":
            return "您可以在我們的部落格中找到各種有關產品、生活和健康的文章。";
        default:
            return "抱歉，我不太理解您的詢問，請再說一遍或聯繫我們的客戶服務團隊。";
    }
}

function appendMessage(sender, message) {
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<p><strong>${sender}: </strong>${message}</p>`;
}

// 送出訊息至對話機器人
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value;
    appendMessage('User', userMessage);
    
    // 使用Ajax送出request至對話機器人API
    const url = "https://20230628.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";
    const APIkey = "0c231a897d494087956ecddd073539f8";
    const ReqID = "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a";
    const projectName = "20230719";
    const deploymentName = "20230719";
    
    const headers = {
        "Ocp-Apim-Subscription-Key": APIkey,
        "Apim-Request-Id": ReqID,
        "Content-Type": "application/json"
    };
    
    const payload = {
        "kind": "Conversation",
        "analysisInput": {
            "conversationItem": {
                "id": "1",
                "text": userMessage,
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
    };
    
    // 使用Ajax向對話機器人API送出request
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        const topIntent = data.result.prediction.topIntent;
        var reply = handleTopIntent(topIntent)
        appendMessage('Bot', reply);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    userInput.value = '';
}