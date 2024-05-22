// Object.freeze 方法可以使得对象变为不可变：
const Color = Object.freeze({
    RED: 0,
    GREEN: 1,
    BLUE: 2
});

const Color = new Map([
    ['RED', 0],
    ['GREEN', 1],
    ['BLUE', 2]
]);

console.log(Color.get('RED')); // 输出: 0


class Color {
    static RED = 0;
    static GREEN = 1;
    static BLUE = 2;

    static getName(value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}

console.log(Color.RED); // 输出: 0
console.log(Color.getName(1)); // 输出: 'GREEN'

// TS
// enum Color {
//     Red,
//     Green,
//     Blue
// }

console.log(Color.Green); // 输出: 1