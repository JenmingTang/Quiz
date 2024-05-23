const LocalStorage = Object.freeze({
    CURRENT_QUESTION: "current_question",
});
localStorage.setItem(LocalStorage.CURRENT_QUESTION, currentQuestion)
localStorage.getItem(LocalStorage.CURRENT_QUESTION)
/*
* 静态网页不支持
* Cannot use import statement outside a module
* */
// import {data} from "./data";
// import * as __data from "./data";
export function usefulFunction() {
    return "usefulFunction";
}
/*
* node环境
* */
// module.exports ={
// myFn:function(){}
// }
// const obj = require()
// obj.myFn()

/*
* JS
* */
// export function myFn() {
//
// }

const data =
    [{
        title: "《党章》总纲中明确指出，中国共产党的性质是",
        options: ["A) 中国共产党是中国工人阶级的先锋队", "B) 是中国特色社会主义事业的领导核心", "C) 代表中国先进生产力的发展要求", "D) 代表中国先进文化的前进方向"],
        answer: ["A", "B", "C", "D"],
        flag: "多选题"
    },
        {
            title: "中国共产党必须不断提高党的创造力、凝聚力、战斗力，建设（）的马克思主义执政党。",
            options: ["A) 学习型；", "B) 努力型；", "C) 服务型；", "D) 创新型；"],
            answer: ["A", "C", "D"],
            flag: "多选题"
        }
    ];
export {
    data
};
