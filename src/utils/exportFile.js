/*
 * @LastEditors: Feiyang
 * @LastEditTime: 2021-05-14 17:39:40
 */
import XLSX from 'xlsx'

export default function exportTable(el, name){
  if(!el){return}
  if(el.$el instanceof Element){el = el.$el}
  let container = el instanceof Element ? el : document.querySelector(el);
  let table = document.createElement('table');
  let tableHeader = container.querySelector('.el-table__header thead').cloneNode(true);
  let tableBody = container.querySelector('.el-table__body tbody').cloneNode(true);
  table.appendChild(tableHeader)
  table.appendChild(tableBody)
  let wb = XLSX.utils.table_to_book(table, {sheet:"Sheet JS"});
  setTimeout(() => {
    wb = null
    table = null
    tableBody = null
    tableHeader = null
  }, 0);
  return XLSX.writeFile(wb, ( (name || 'file') + '.xlsx' ))
}
