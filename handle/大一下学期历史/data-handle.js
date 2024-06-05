
// 大写字母数组
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const data = []

const doHandle = (subExamPaperContentListLaw) => {
    subExamPaperContentListLaw.subExamPaperContentList.forEach(item => {
        const title = item.question.title.replaceAll('&nbsp;','')
        const options = item.question.answerOptionArray.map((item, index) => `${letters[index]}) ${item}`)
        // 将answerArray的数组元素0、1、2、3替换成A、B、C、D
        const answer = item.question.answerArray.map((item, index) =>letters[item])
        const flag = item.name+= ` / answer.length: ${answer.length}`
        // 依次打印变量
        // console.log(`${flag}：${title}`)
        // console.log(`选项：${options.join('\n')}`)
        // console.log(`答案：${answer.join('')}`)
        // console.log()
        data.push({
            title,
            options,
            answer,
            flag
        })
    })
}
/* 
！！！修改epc_answer_one、epc_answer_two
*/
doHandle(epc_answer_ten.subExamPaperContentList[0])
doHandle(epc_answer_ten.subExamPaperContentList[1])
// console.log(data)
// 不适用DOM的复制到剪切板

// 复制文本到剪切板的函数
async function copyTextToClipboard(text) {
    try {
        // await navigator.clipboard.writeText(text);
        await navigator.clipboard.writeText(JSON.stringify(data));
        alert('文本已复制到剪切板');
    } catch (err) {
        console.error('无法复制文本: ', err);
    }
}