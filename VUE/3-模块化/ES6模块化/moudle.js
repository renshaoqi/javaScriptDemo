let num1 = 10;
let num2 = 20;

function fn() {
    console.log("fn");
}

// 默认导出一个成员  导入：import 接收名称 from 模块
export default {
    num1,
    num2,
    fn
}

export let a = 10;
export let b = 20;
export function fn2() {
    console.log("fn2");
}
