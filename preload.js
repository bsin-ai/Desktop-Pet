const { contextBridge, ipcRenderer } = require('electron');

// 必须使用 contextBridge 暴露方法给渲染进程
contextBridge.exposeInMainWorld('api', {
  setIgnoreMouseEvents: (ignore, options) => {
    ipcRenderer.send('set-ignore-mouse-events', ignore, options);
  }
});
