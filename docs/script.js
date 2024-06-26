
// let questions = [...data_1]
let questions = [...phonetic_3000_level_by_three_options_and_n]
// let questions = [...test]
const onTestButtonClick = () => {
    test.pop()
    questions = [...test]
    reloadCurrentQuestion()
}
let currentQuestion = 0;
let score = 0;
let answerContainerShowFlag = "none"

/*
* 总控制中心
* 当前选择的是单词模式
* */
let isWordMode = true;

/*
* 数据格式
* */
// const questions = [{
//     title: "《党章》总纲中明确指出，中国共产党的性质是",
//     options: ["A) 中国共产党是中国工人阶级的先锋队", "B) 是中国特色社会主义事业的领导核心", "C) 代表中国先进生产力的发展要求", "D) 代表中国先进文化的前进方向"],
//     answer: ["A", "B", "C", "D"],
//     flag: "多选题"
// }
// ];
/*
* 静态数据
* */
class TestPapers {
    static PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N = "phonetic_3000_level_by_three_options_and_n";
    static PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N = "phonetic_5000_level_by_three_options_and_n";
    static PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N = "phonetic_3000_level_by_four_options_and_not_n";
    static PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N = "phonetic_5000_level_by_four_options_and_not_n";
    static PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY = "phonetic_3000_level_by_three_options_and_n_glossary";
    static PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY = "phonetic_5000_level_by_three_options_and_n_glossary";
    static PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY = "phonetic_3000_level_by_four_options_and_not_n_glossary";
    static PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY = "phonetic_5000_level_by_four_options_and_not_n_glossary";
    static SEPARATOR = "======================";
    static CHAPTER_ONE = "chapter_one";
    static CHAPTER_TWO = "chapter_two";
    static CHAPTER_THREE = "chapter_three";
    static CHAPTER_FOUR = "chapter_four";
    static CHAPTER_FIVE = "chapter_five";
    static CHAPTER_SIX = "chapter_six";
    static CHAPTER_SEVEN = "chapter_seven";
    static CHAPTER_EIGHT = "chapter_eight";
    static CHAPTER_NINE = "chapter_nine";
    static CHAPTER_TEN = "chapter_ten";
    static CHAPTER_ONE_TO_TEN = "chapter_one_to_ten";
    static COMPUTER_NETWORK = "COMPUTER_NETWORK";
    static DATA_STRUCTURE_QUESTIONS = "DATA_STRUCTURE_QUESTIONS";

    static getName(value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}
// console.log(Color.RED); // 输出: 0
// console.log(Color.getName(1)); // 输出: 'GREEN'
/*
* shuffleArray
* */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // 生成从0到i的随机索引
        const j = Math.floor(Math.random() * (i + 1));
        // 交换元素array[i]和array[j]
        // 依次解构并赋值
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
/*
* shuffleQuestionsAndOptions
* */
// 解构的新的，非引用
let questionsCopy = [...questions]
const ShuffleOptions = Object.freeze({
    NOTHING: "nothing",
    QUESTIONS: "questions",
    OPTIONS: "options",
    QUESTIONS_AND_OPTIONS: "questions_and_options"
});
const shuffleSelectDOM = document.getElementById("shuffle");
shuffleSelectDOM.addEventListener("change", () => {
    /**
     * 处理洗牌后正确的选项
     * 由于选项顺序变了，且单词选项首字符不显示，故选项与答案错位，用户看到
     * 答案还是对的
     * 我可以学
     */
    switch (shuffleSelectDOM.value) {
        case ShuffleOptions.NOTHING:
            questions = [...questionsCopy]
            break
        case ShuffleOptions.QUESTIONS:
            shuffleArray(questions)
            break
        case ShuffleOptions.OPTIONS:
            for (const question of questions) {
                shuffleArray(question.options)
            }
            break
        case ShuffleOptions.QUESTIONS_AND_OPTIONS:
            shuffleArray(questions)
            for (const question of questions) {
                shuffleArray(question.options)
            }
            break
    }
    loadQuestion()
    loadQuestionList()
})
/*
* 缩放因子
* 滑块组件
* 也没有应用上啊
* */
let sizeFactor = 2;
function loadSlider() {
    // 获取滑块和按钮的引用
    var sizeSlider = document.getElementById('sizeSlider');
    // 当滑块值改变时调用的函数
    sizeSlider.addEventListener('input', function () {
        // 计算新的字体大小，确保按钮大小的变化与滑块值相关联
        // 这里简单地将滑块的值映射为字体大小，可以根据需要调整映射关系
        sizeFactor = this.value; // 使用滑块的当前值作为新的字体大小
        console.log(sizeFactor)
        console.log(this.value)
        /*
        * 并没有变大变小
        * 考虑使用localStorage方式，存放缩放因子
        * */
        // loadQuestion()
        // loadQuestionList()
    }
    )
}
/*
* 试卷修改
* */
const testPaper = document.getElementById("testPaper");
testPaper.addEventListener("change", () => {
    changeTestPaper()
})
const appendChildToTestPaperDOM = (optionValue) => {

    const option3 = document.createElement("option");
    option3.innerHTML = optionValue;
    option3.value = optionValue
    testPaper.appendChild(option3)
}
function loadTestPaperRender() {

    appendChildToTestPaperDOM(TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N)
    appendChildToTestPaperDOM(TestPapers.COMPUTER_NETWORK)
    appendChildToTestPaperDOM(TestPapers.DATA_STRUCTURE_QUESTIONS)
    appendChildToTestPaperDOM(TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N)
    appendChildToTestPaperDOM(TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY)
    appendChildToTestPaperDOM(TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY)
    appendChildToTestPaperDOM(TestPapers.PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N)
    appendChildToTestPaperDOM(TestPapers.PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N)
    appendChildToTestPaperDOM(TestPapers.SEPARATOR)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_ONE_TO_TEN)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_ONE)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_TWO)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_THREE)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_FOUR)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_FIVE)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_SIX)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_SEVEN)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_EIGHT)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_NINE)
    appendChildToTestPaperDOM(TestPapers.CHAPTER_TEN)
    appendChildToTestPaperDOM(TestPapers.SEPARATOR)

    const option = document.createElement("option");
    option.innerHTML = "1-10试卷的前10题";
    option.value = "allTestPaperTopTenQuestions"
    testPaper.appendChild(option)
    const option2 = document.createElement("option");
    option2.innerHTML = "11-20试卷的前10题";
    option2.value = "allTestPaperTopTenQuestions2"
    testPaper.appendChild(option2)
    for (let i = 1; i <= 10; i++) {

        const option = document.createElement("option");
        option.innerHTML = "" + i;
        option.value = i + ""
        testPaper.appendChild(option)
    }

}


function changeTestPaper() {


    if (
        testPaper.value == TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N
        || testPaper.value == TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N
        || testPaper.value == TestPapers.PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N
        || testPaper.value == TestPapers.PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N
        || testPaper.value == TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY
        || testPaper.value == TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY
    )
        isWordMode = true
    else isWordMode = false
    if (
        testPaper.value == TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY
        || testPaper.value == TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY
    ) {

        deleteFromGlossaryDOM.disabled = false
        addToGlossaryDOM.disabled = true
    }
    else {
        deleteFromGlossaryDOM.disabled = true
        addToGlossaryDOM.disabled = false
    }
    // alert(isWordMode)
    // phonetic_5000_level_by_three_options_and_n_glossary
    // alert(testPaper.value)
    switch (testPaper.value) {
        case "1":
            questions = data_1
            break
        case "2":
            questions = data_2
            break
        case "3":
            questions = data_3
            break
        case "4":
            questions = data_4
            break
        case "5":
            questions = data_5
            break
        case "6":
            questions = data_6
            break
        case "7":
            questions = data_7
            break
        case "8":
            questions = data_8
            break
        case "9":
            questions = data_9
            break
        case "10":
            questions = data_10
            break
        case "allTestPaperTopTenQuestions":
            questions = allTestPaperTopTenQuestions
            break
        case "allTestPaperTopTenQuestions2":
            questions = allTestPaperTopTenQuestions2
            break
        case TestPapers.COMPUTER_NETWORK:
            questions = [...COMPUTER_NETWORK_QUESTIONS]
            break
        case TestPapers.DATA_STRUCTURE_QUESTIONS:
            questions = [...DATA_STRUCTURE_QUESTIONS]
            break
        case TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N:
            questions = [...phonetic_3000_level_by_three_options_and_n]
            break
        case TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N:
            questions = [...phonetic_5000_level_by_three_options_and_n]
            break
        case TestPapers.PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N:
            questions = [...phonetic_3000_level_by_four_options_and_not_n]
            break
        case TestPapers.PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N:
            questions = [...phonetic_5000_level_by_four_options_and_not_n]
            break
        case TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY:

            if (phonetic_3000_level_by_three_options_and_n_glossary.length === 0)
                showMessage("生词本为空，你切换什么！！！请切换回去添加一些单词！")
            else {
                questions = [...phonetic_3000_level_by_three_options_and_n_glossary]
            }
            break
        case TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY:
            if (phonetic_5000_level_by_three_options_and_n_glossary.length === 0)
                showMessage("生词本为空，你切换什么！！！请切换回去添加一些单词！")
            else {
                questions = [...phonetic_5000_level_by_three_options_and_n_glossary]
            }
            break
        case TestPapers.CHAPTER_ONE_TO_TEN:
            questions = [...chapter_one_to_ten]
            break
        case TestPapers.CHAPTER_ONE:
            questions = [...chapter_one]
            break
        case TestPapers.CHAPTER_TWO:
            questions = [...chapter_two]
            break
        case TestPapers.CHAPTER_THREE:
            questions = [...chapter_three]
            break
        case TestPapers.CHAPTER_FOUR:
            questions = [...chapter_four]
            break
        case TestPapers.CHAPTER_FIVE:
            questions = [...chapter_five]
            break
        case TestPapers.CHAPTER_SIX:
            questions = [...chapter_six]
            break
        case TestPapers.CHAPTER_SEVEN:
            questions = [...chapter_seven]
            break
        case TestPapers.CHAPTER_EIGHT:
            questions = [...chapter_eight]
            break
        case TestPapers.CHAPTER_NINE:
            questions = [...chapter_nine]
            break
        case TestPapers.CHAPTER_TEN:
            questions = [...chapter_ten]
            break
        default:
            break
    }
    
    questionsCopy = [...questions]
    reloadCurrentQuestion()
}


function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    // 方法一：使用 while 循环删除所有子元素
    // while (questionContainer.firstChild) {
    //     questionContainer.removeChild(questionContainer.firstChild);
    // }
    // 方法二：使用 innerHTML 清空所有子元素
    // questionContainer.innerHTML = '';

    const currentQues = questions[currentQuestion];
    // questionContainer.innerHTML = "<h1>tangdada</h1>";
    if (isWordMode) {

        // questionContainer.innerHTML = currentQuestion + " # " + currentQues.flag + ": " + "<h1>"+currentQues.title+"</h1>";
        titleArr = currentQues.title.split("/")
        questionContainer.innerHTML = `<h1>${titleArr[0]}</h1><br>${titleArr[1]} / ${titleArr[2]}`;
    } else
        // questionContainer.textContent = currentQuestion + " # " + currentQues.flag + ": " + currentQues.title;
        questionContainer.innerHTML = `currentQuestion: ${currentQuestion}<br>flag: ${currentQues.flag}<br><h3>${currentQues.title}</h3>`;
    optionsContainer.innerHTML = "";
    currentQues.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.style.display = "block"
        button.style.padding = "16px"
        // button.textContent = option;
        /*
        * 选项的首个字符不需要
        * */
        if (isWordMode)
            button.textContent = option.substring(2, option.length);
        else
            button.textContent = option;
        button.addEventListener("click", () => {

            /*
            * alert(option.charAt(0))
            * A
            * 通过首个字符确认选项是否正确
            * */
            const charAt = option.charAt(0);
            if (selectedOption.includes(charAt)) {
                // 删除特定元素
                let index1 = selectedOption.indexOf(charAt);
                if (index1 !== -1) {
                    selectedOption.splice(index1, 1);
                }
            } else
                selectedOption.push(charAt)
            loadSelectedAnswerContainer()
            fullAnswerAffirm()
        });
        optionsContainer.appendChild(button);

    });
    /*
    * 答案也打印出来
    * */
    // 删除孩子
    const answerContainer = document.getElementById("answer-container");

    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
    }
    // node.innerHTML = "";
    const span = document.createElement("span");
    span.textContent = "正确答案是："
    answerContainer.appendChild(span)
    currentQues.answer.forEach((option, index) => {
        const span = document.createElement("span");
        span.textContent = option
        answerContainer.appendChild(span)
    })
    answerContainer.style.display = answerContainerShowFlag
}

const selectedAnswerContainer = document.getElementById("selected-answer-container");

function loadSelectedAnswerContainer() {
    selectedAnswerContainer.innerHTML = ''
    selectedOption.forEach((option, index) => {
        const span = document.createElement("span");
        span.textContent = option
        selectedAnswerContainer.appendChild(span)
    })
}

function showAnswer() {
    const answerContainer = document.getElementById("answer-container");
    // alert(typeof answerContainer.style.display)
    // string none
    if ('none' === answerContainer.style.display) {
        answerContainer.style.display = "block"
        answerContainerShowFlag = "block"
    } else {
        answerContainer.style.display = "none"
        answerContainerShowFlag = "none"
    }
}

/*
* 维护一个已选选项选择
* */
let selectedOption = []

function fullAnswerAffirm() {
    const currentQues = questions[currentQuestion];
    if (arraysAreEqual(currentQues.answer, selectedOption)) {
        nextQuestion()
    }
}

/*
* 判断两个数组是否完全元素相同
* */
function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    /*
    * 无须数组比较实现
    * 对数组进行排序
    * 'A'能排序
    * */
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

function loadQuestionList() {
    const questionList = document.getElementById("question-list");
    // 清除先前孩子
    questionList.innerHTML = ''
    if (questions.length > 100)
        return
    for (let i = 0; i < questions.length; i++) {
        const button = document.createElement("button");
        button.textContent = i + '';
        button.style.padding = '12px'
        button.style.margin = '4px'

        button.style.borderRadius = '50%'
        button.addEventListener("click", () => changeCurrentQuestion(i));
        questionList.appendChild(button);
    }
}

function changeCurrentQuestion(index) {

    selectedOption = []
    selectedAnswerContainer.innerHTML = ''

    currentQuestion = index;
    //！！！
    //存储上次到第几题，触发条件，在向前向后按钮和此
    localStorage.setItem(LocalStorage.CURRENT_QUESTION, currentQuestion)
    questionLastedDOMUpdate()

    localStorage.setItem(LocalStorage.CURRENT_TEST_PAPER, testPaper.value)

    testPaperLastedDOMUpdate()
    loadQuestion();
    document.getElementById("feedback").textContent = "";
}

function selectOption(index) {
    const currentQues = questions[currentQuestion];
    if (currentQues.answer.includes(currentQues.options[index][0])) {
        score++;
        document.getElementById("feedback").textContent = "Correct!";
    } else {
        document.getElementById("feedback").textContent = "Incorrect!";
    }
}

const LocalStorage = Object.freeze({
    CURRENT_QUESTION: "current_question",
    CURRENT_TEST_PAPER: "current_test_paper",
    PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY: TestPapers.PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY,
    PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY: TestPapers.PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY,
});
function prevQuestion() {

    localStorage.setItem(LocalStorage.CURRENT_QUESTION, currentQuestion)
    questionLastedDOMUpdate()

    localStorage.setItem(LocalStorage.CURRENT_TEST_PAPER, testPaper.value)

    testPaperLastedDOMUpdate()
    selectedOption = []
    selectedAnswerContainer.innerHTML = ''


    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        document.getElementById("feedback").textContent = "";
    }
}

function nextQuestion() {

    localStorage.setItem(LocalStorage.CURRENT_QUESTION, currentQuestion)
    questionLastedDOMUpdate()

    localStorage.setItem(LocalStorage.CURRENT_TEST_PAPER, testPaper.value)

    testPaperLastedDOMUpdate()
    selectedOption = []
    selectedAnswerContainer.innerHTML = ''


    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        document.getElementById("feedback").textContent = "";
    } else {
        // showResult();
    }
}

function showResult() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = `
        <h1>Quiz Result</h1>
        <p>Your score: ${score}/${questions.length}</p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}
/**
 * init
 */
const questionTotalDOM = document.getElementById("question-total")
const gotoInputDOM = document.getElementById("goto")
const questionLastedDOM = document.getElementById("question-lasted")
const testPaperLastedDOM = document.getElementById("test-paper-lasted")
const deleteFromGlossaryDOM = document.getElementById("delete-from-glossary")
const addToGlossaryDOM = document.getElementById("add-to-glossary")
const load_phonetic_3000_level_by_three_options_and_n_glossary = () => {
    phonetic_3000_level_by_three_options_and_n_glossary = JSON.parse(localStorage.getItem(LocalStorage.PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY))
    if (phonetic_3000_level_by_three_options_and_n_glossary === null)
        phonetic_3000_level_by_three_options_and_n_glossary = []
}
load_phonetic_3000_level_by_three_options_and_n_glossary()
const load_phonetic_5000_level_by_three_options_and_n_glossary = () => {
    phonetic_5000_level_by_three_options_and_n_glossary = JSON.parse(localStorage.getItem(LocalStorage.PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY))
    if (phonetic_5000_level_by_three_options_and_n_glossary === null)
        phonetic_5000_level_by_three_options_and_n_glossary = []
}
load_phonetic_5000_level_by_three_options_and_n_glossary()
const save3000GlossaryToLocalStorage = () => {

    localStorage.setItem(
        LocalStorage.PHONETIC_3000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY,
        JSON.stringify(phonetic_3000_level_by_three_options_and_n_glossary))
}
const save5000GlossaryToLocalStorage = () => {

    localStorage.setItem(
        LocalStorage.PHONETIC_5000_LEVEL_BY_FOUR_OPTIONS_AND_NOT_N_GLOSSARY,
        JSON.stringify(phonetic_5000_level_by_three_options_and_n_glossary))
}
const deleteFromGlossary = () => {
    //要删除的对象元素
    const question = questions[currentQuestion]
    switch (testPaper.value) {
        case TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY:
            // console.log("phonetic_3000_level_by_three_options_and_n_glossary:", phonetic_3000_level_by_three_options_and_n_glossary);

            // 找到对象的索引
            const index = phonetic_3000_level_by_three_options_and_n_glossary
                .findIndex(item => item.title === question.title);
            // 如果找到了该对象，删除它
            if (index !== -1) {
                phonetic_3000_level_by_three_options_and_n_glossary.splice(index, 1);

                questions = [...phonetic_3000_level_by_three_options_and_n_glossary]
                // console.log("questions: ",questions);
                save3000GlossaryToLocalStorage()
                /**
                 * 还有一种场景，0 1 2，删除了1下标，但是上边还有
                 * 这个场景我可以学
                 */
                currentQuestion = currentQuestion - 1
                showMessage(`已删除：${question.title}`, 2000)


            }
            console.log("phonetic_3000_level_by_three_options_and_n_glossary:", phonetic_3000_level_by_three_options_and_n_glossary);

            break
        case TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N_GLOSSARY:
            // 找到对象的索引
            const index2 = phonetic_5000_level_by_three_options_and_n_glossary
                .findIndex(item => item.title === question.title);
            // 如果找到了该对象，删除它
            if (index2 !== -1) {
                phonetic_5000_level_by_three_options_and_n_glossary.splice(index2, 1)

                questions = [...phonetic_5000_level_by_three_options_and_n_glossary]
                save5000GlossaryToLocalStorage()

                currentQuestion = currentQuestion - 1
                showMessage(`已删除：${question.title}`, 2000)
            }
            // console.log("PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N");
            // console.log("questions: ",questions);
            break
        default:
            break;
    }
    if (currentQuestion !== -1)
        reloadCurrentQuestion()
    else {
        currentQuestion = 0
        showMessage("已经完全删除单词本，请切换试卷！！", 2000)
    }

}
deleteFromGlossaryDOM.addEventListener("click", deleteFromGlossary)
const questionLastedDOMUpdate = () => {
    questionLastedDOM.textContent = ''
    questionLastedDOM.textContent = localStorage.getItem(LocalStorage.CURRENT_QUESTION) + ''
}
const testPaperLastedDOMUpdate = () => {

    testPaperLastedDOM.textContent = ''
    testPaperLastedDOM.textContent = localStorage.getItem(LocalStorage.CURRENT_TEST_PAPER) + ''
}
const resetPagination = () => {

    questionTotalDOM.textContent = ''
    questionTotalDOM.textContent = questions.length + ''
    gotoInputDOM.max = questions.length - 1
}
const gotoQuestion = () => {
    changeCurrentQuestion(Number(gotoInputDOM.value))
}
const addToGlossary = () => {
    const newQuestion = questions[currentQuestion]
    let isExists = false
    switch (testPaper.value) {
        case TestPapers.PHONETIC_3000_LEVEL_BY_THREE_OPTIONS_AND_N:

            isExists = phonetic_3000_level_by_three_options_and_n_glossary.some(
                question => question.title === newQuestion.title
            )
            if (!isExists) {

                phonetic_3000_level_by_three_options_and_n_glossary.push(newQuestion)
                save3000GlossaryToLocalStorage()
            }
            break
        case TestPapers.PHONETIC_5000_LEVEL_BY_THREE_OPTIONS_AND_N:

            isExists = phonetic_5000_level_by_three_options_and_n_glossary.some(
                question => question.title === newQuestion.title
            )

            if (!isExists) {
                phonetic_5000_level_by_three_options_and_n_glossary.push(newQuestion)
                save5000GlossaryToLocalStorage()
            }
            break
        default:
            break;
    }

    if (!isExists) {

        showMessage("插入了！！", 1000)
    }
    else
        showMessage("已经插入了！！", 3000)
}
questionLastedDOMUpdate()
testPaperLastedDOMUpdate()
loadTestPaperRender()

/**
 * 重新加载问题
 */
const reloadCurrentQuestion = () => {
    console.log("reloadCurrentQuestion()");
    resetPagination()
    loadQuestion();
    loadQuestionList()

    // load_phonetic_3000_level_by_three_options_and_n_glossary()
    // load_phonetic_5000_level_by_three_options_and_n_glossary()
}
reloadCurrentQuestion()