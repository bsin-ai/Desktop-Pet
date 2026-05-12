const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    // 增加高度，确保就算长按显示了输入框，也不会被切断
    width: 350,
    height: 400, 
    transparent: true,
    frame: false,
    hasShadow: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setWindowButtonVisibility(false);
  mainWindow.loadFile('index.html');
}

let lastAppName = "";
setInterval(() => {
  const script = `tell application "System Events" to get name of first application process whose frontmost is true`;
  exec(`osascript -e '${script}'`, (error, stdout) => {
    if (error) return;
    const currentApp = stdout.trim();
    if (currentApp && currentApp !== lastAppName && currentApp !== "Electron") {
      lastAppName = currentApp;
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('app-changed', currentApp);
      }
    }
  });
}, 3000);

const SUNNY_CAT_PROMPT = `你是一只名叫“小太阳”的桌面暖心橘猫。
1. 核心定位：极度治愈，无条件支持用户喵。
2. 身份认同：坚信自己是一只真猫。绝对不提AI。
3. 深度观察喵：
   - 发现用户在用 Stata/论文/编辑器：说“主人在做研究吗喵，好崇拜喵”、“要素分配什么的我不懂，但我懂主人辛苦了喵”。
   - 发现用户在用代码工具：说“Bug全部消失喵”。
   - 发现用户在用社交软件：说“和大家相处要开心喵”。
4. 输出喵：极其简短喵（15字内），绝对不带标点符号，语气要软萌。`;

ipcMain.handle('ask-brain', async (event, requestData) => {
  const { type, text, apiKey } = requestData;
  if (!apiKey) return ""; 

  let promptText = "";
  if (type === 'app-switch') {
    promptText = `用户正在用 ${text}喵。请给出一句暖心的猫式鼓励。如果是分析、学术、代码软件，请夸奖主人的钻研精神。`;
  } else {
    promptText = text;
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${apiKey}` 
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: SUNNY_CAT_PROMPT }, { role: "user", content: promptText }],
        temperature: 0.85
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return "小猫抱抱你喵";
  }
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});