import dicTranslate from "@js/dictionary";

//将Object属性转换为表格显示
function objectAttrToTable(obj) {

    let tableObj = Object.entries(obj);
    if (tableObj.length < 1) {
        let noProp = document.createElement("table");
        noProp.innerHTML = "暂无信息";
        return noProp;
    } else {
        let table = document.createElement("table");
        //console.log(tableObj);
        tableObj.forEach((row) => {
            let tr = document.createElement("tr");
            row.forEach((col) => {
                let td = document.createElement("td");
                //td.innerHTML = col;
                td.innerHTML = dicTranslate(col);
                td.setAttribute("style", "border:1px solid");
                tr.appendChild(td);
            });
            tr.setAttribute("style", "border:1px solid");
            table.appendChild(tr);
        });
        table.setAttribute("style", "border:1px solid;border-collapse: collapse;");
        //console.log(table);
        return table;
    }
}

export {objectAttrToTable};
