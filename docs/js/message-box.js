// 显示消息框函数
function showMessage(message, duration = 3000) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.classList.add('show');

    // 定时关闭消息框
    setTimeout(() => {
      hideMessage();
    }, duration);
  }

  // 隐藏消息框函数
  function hideMessage() {
    const messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('show');
  }

  // 修改消息内容
  function setMessageContent(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
  }

  // 示例：显示消息框
//   showMessage('Hello, this is a test message!', 5000);