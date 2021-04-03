const StringUtility = {
  inputValidation: (value) => {
    let valid = true;
    if (!!value) {
      valid = false;
    } else if (value.trim() === '') {
      valid = false;
    }
    return valid;
  },
};

export default StringUtility;
