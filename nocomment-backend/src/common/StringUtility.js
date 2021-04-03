const StringUtility = {
  inputValidation: (value) => {
    let valid = true;
    if (!value || value === undefined || value === null) {
      valid = false;
    } else if (value.trim() === '') {
      valid = false;
    }
    return valid;
  },
  deleteHtmlTag: (value) => {
    return value.replace(/<\/?[^>]*>/gi, '');
  },
};

export default StringUtility;
