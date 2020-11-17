const commonFN = {
  stringify: function(obj, sep, eq) { // qs.stringify
    sep = sep || '&';
    eq = eq || '=';
    let str = "";
    for (var k in obj) {
      str += k + eq + unescape(obj[k]) + sep
    }
    return str.slice(0, -1)
  },

  parse: function(str) { //qs.parse
    var obj = new Object();
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      let index = strs[i].indexOf("=")
      obj[strs[i].slice(0, index)] = unescape(strs[i].slice(index + 1));
    }
    return obj;
  },

  getRequest: function() { // 解析url地址
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      return parse(str)
    }
  },
  store: {
    debug: true,
    state: {},
    setAction(index, newValue) {
      if (this.debug) console.log('setAction', newValue);
      this.state[index] = newValue;
    },
    clearAction(index) {
      if (this.debug) console.log('clearAction');
      this.state[index] = '';
    }
  }

}
export default commonFN;
