function transTable (listData) {
  return listData.map(item => {
    return {
      label: item[0],
      name: item[1],
      is: item[2],
      isEditable: item[3],
      type: item[4],
      width: item[5],
    }
  })
}
function transSearch (listData) {
  return listData.map(item => {
    return {
      label: item[0],
      name: item[1],
      type: item[2],
      data: item[3]
    }
  })
}
export default {
  transTable,
  transSearch
}
