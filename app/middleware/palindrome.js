module.exports = palindrome = (req, res, next) => {

    function palindrome(text) {
      // Trim the given message, remove spaces
      // change the alphabet characters to lowercase
      var rex = /[^A-Za-z0-9]/g;
      var str = text.toLowerCase().replace(rex, '');
      var len = str.length;

      // Compare the first half of the message with the second half of the message
      for (var i = 0; i < len/2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
      }
      return true;
    }
  
    // Evaluate the message if it exist in the request body
    if(req.body && req.body.text) {
      req.body.is_palindrome = palindrome(req.body.text)
    }
    
    next()
  }