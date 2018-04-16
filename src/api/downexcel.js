import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  exportExcel (excel) {   
    const _self = this      
    const wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' }) 
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), excel)
    } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    return wbout
  }
}
