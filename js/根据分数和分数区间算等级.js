// 根据数据区间算分数
// const arr = [0,10000000,20000000,30000000,50000000,Number.MAX_VALUE];
// // 资产规模
// const findIndex = (val, arr) => (arr.findIndex((el) => el > val) - 1)
// console.log(findIndex(50000000, arr));

const arr = [0,0.5,0.6,0.7,0.8,1];  // 0 1 2 3
// 资产负债率
const findIndex = (val, arr) => (arr.findIndex((el) => el >= val) - 1)
const core = 2 - findIndex(0.9, arr) * 0.5
console.log(core);
