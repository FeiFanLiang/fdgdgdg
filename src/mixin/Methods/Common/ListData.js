module.exports = {
  resetForm(formName) {
    try {
      if (
        formName &&
        this.$refs &&
        this.$refs[formName] &&
        typeof this.$refs[formName].resetFields === 'function'
      ) {
        this.$refs[formName].resetFields();
      }
    } catch (e) {
      // for (let item in this[formName]) {
      //   this[formName][item] = '';
      // }
    }
  }
};
