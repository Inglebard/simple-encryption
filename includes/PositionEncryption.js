class PositionEncryption {
  static encrypt(key, str, param) {
    const unknown_char = param.unknown_char ? param.unknown_char : '■';
    const offset = param.offset ? param.offset : 0;

    let result = "";
    for (let i = 0; i < str.length; i++) {
      let index = -1;
      if (key.indexOf(str[i]) >= 0) {
        index = key.indexOf(str[i]) + i + offset;
        while (index > key.length - 1) {
          index -= key.length;
        }
      }

      let encrypted_char;
      if (index == -1) {
        encrypted_char = unknown_char;
      } else {
        encrypted_char = key[index];
      }
      result += encrypted_char;
    }
    return result;
  }

  static decrypt(key, str, param) {
    const unknown_char = param.unknown_char ? param.unknown_char : '■';
    const offset = param.offset ? param.offset : 0;

    let result = "";
    for (let i = 0; i < str.length; i++) {
      let index = -1;
      if (key.indexOf(str[i]) >= 0) {
        index = key.indexOf(str[i]) - i - offset;
        while (index < 0) {
          index += key.length;
        }
      }

      let decrypted_char;
      if (index == -1) {
        decrypted_char = unknown_char;
      } else {
        decrypted_char = key[index];
      }
      result += decrypted_char;
    }
    return result;
  }
}

module.exports = PositionEncryption;
