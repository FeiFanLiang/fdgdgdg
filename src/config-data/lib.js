function trans (data) {
  return data.map(item => {
    return {
      label: item[0],
      name: item[1],
      is: item[2],
      isEditable: item[3],
      type: item[4]
    }
  })
}

export default {
  trans
}
