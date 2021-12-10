//从Object中去除不需要的键值对
const defaultDisplayFilterCondition = [
    "geometry",
    "treeNode",
];

//筛选不需要的属性（删除）
function filterAttribute(attribute, filterCondition = defaultDisplayFilterCondition) {
    let display = {};
    for (const key in attribute) {
        if (!filterCondition.includes(key)) display[key] = attribute[key];
    }
    return display;
}

export {filterAttribute};
