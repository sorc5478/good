const WebSocket = require("ws");
const PORT = process.env.PORT || 8080; // Heroku 會自動指定 PORT

const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
    console.log("新用戶連線");

    ws.on("message", (message) => {
        console.log("收到訊息:", message);

        // 廣播這個訊息給所有其他連線的客戶端
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("用戶斷線");
    });
});

console.log(`WebSocket 信令伺服器已啟動，監聽端口 ${PORT}`);
