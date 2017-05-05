module.exports = {
  resetForm(formName) {
    if (
      formName &&
      this.$refs &&
      this.$refs[formName] &&
      typeof this.$refs[formName].resetFields === 'function'
    ) {
      this.$refs[formName].resetFields();
    }
  }
};
