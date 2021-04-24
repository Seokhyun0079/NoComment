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
    try {
      return value.replace(/<\/?[^>]*>/gi, '');
    } catch (e) {
      return;
    }
  },
  findImg: (value) => {
    try {
      // const regex = RegExp('<img[^>]*src=["\']?([^>"\']+)["\']?[^>]*>');
      return [...value.matchAll('<img[^>]*src=["\']?([^>"\']+)["\']?[^>]*>')];
    } catch (e) {
      return;
    }
  },
};

export default StringUtility;
