/* 

F12 JS文件
通过v=202405070814直接得到没有答案的题目
https://ks.gxmzu.edu.cn/static/fiftest//paperResource/8f52ef0d77f34bbeafdbb8f147525167/partjson_0.js?v=202405070814
同理，找有答案的
注意v=
https://ks.gxmzu.edu.cn/static/fiftest//paperResource/981509da69264b20aebdc3068996adcc/epc_answer.js?v=202405070815
v=就是个幌子
！！！重点是981509da69264b20aebdc3068996adcc
第八章
https://ks.gxmzu.edu.cn/static/fiftest//paperResource/8f52ef0d77f34bbeafdbb8f147525167/epc_answer.js
第九章
https://ks.gxmzu.edu.cn/static/fiftest//paperResource/9bc44a4426594b9fbebbf77e1d01891c/epc_answer.js


班群讯飞平台

交卷后在结果页能看到带答案的题目
*/
/* 

    {
        "title": "worship / 美['wɜːrʃɪp]  / 英['wɜːʃɪp] ",
        "options": [
            "A) v. 敬奉 / 信奉 / 崇拜 / 尊敬",
            "B) n. 蒸汽 / 蒸气膨胀力 / 蒸汽机车 / 精力",
            "C) n. 巧合 / 符合 / 同时发生 / 一致",
            "D) n. 敬神 / 拜神 / 崇拜 / 爱慕"
        ],
        "answer": [
            "D",
            "A"
        ],
        "flag": "answers amount: 2 "
    },
*/

/* 
var elements = document.getElementsByClassName('box-noborder noH2-padtop27');
Array.from(elements).forEach(function(element) {
*/
/* 
测试
！！！使用 getElementsByClassName 之前要 Ctrl+Shift+C 随便选择一下元素
！！！使用 getElementsByClassName 之前要 Ctrl+Shift+C 随便选择一下元素
！！！使用 getElementsByClassName 之前要 Ctrl+Shift+C 随便选择一下元素
不然document.getElementsByClassName('box-noborder noH2-padtop27')找不到
*/
const chapter_test = []
const elements_local = document.getElementsByClassName('box-noborder noH2-padtop27');

[...elements_local].forEach(function(element, index) {
    // console.log("Element " + index + ":", element); 
    
    const title = element.childNodes[1].childNodes[1].textContent
    const options = [
        element.childNodes[1].childNodes[4].textContent,
        element.childNodes[1].childNodes[7].textContent,
        element.childNodes[1].childNodes[10].textContent,
        element.childNodes[1].childNodes[13].textContent,
    ]

    const answer = element.childNodes[3].childNodes[0].childNodes[1].textContent.split(' ')
    // 数组答案最后一个会是' '
    const filteredAnswer = answer.filter(item => item !== " " && item !== "");
    /* 
    document.getElementsByClassName('box-noborder noH2-padtop27')
    
    确认以下单 多选
    */
    let  flag
    if (filteredAnswer.length > 1) {
        flag = '多选题 / '
    } else {
        flag = '单选题 / '
    }
    flag += "answers amount: " + filteredAnswer.length
    chapter_test.push({
        title: title,
        options: options,
        answer: filteredAnswer,
        flag: flag
    })
});
// console.log(chapter_test)

function copyToClipboard(text) {
  // 创建一个 textarea 元素用于复制文本
  const textarea = document.createElement('textarea');
  textarea.value = text; // 设置需要复制的文本
  document.body.appendChild(textarea); // 将 textarea 添加到 DOM 中

  // 选中 textarea 中的文本
  textarea.select();
  textarea.setSelectionRange(0, 999999999999999); // 适应不同浏览器，确保全选

  // 执行复制命令

  try {
    const result = document.execCommand('copy');
    if (result) {
      console.log('Text copied to clipboard');
    } else {
      console.error('Copy command not supported');
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
  }

  // 清理，移除创建的 textarea
  document.body.removeChild(textarea);
}

// 使用函数
// copyToClipboard('你好，这是要复制的文本！');
// ！！！后用json美化即可变为JS对象，无需JSON.parse()
copyToClipboard(JSON.stringify(chapter_test));