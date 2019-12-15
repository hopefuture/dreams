function encode (value) {
  try {
    return encodeURIComponent(value);
  } catch (e) {
    console.error(e);
  }
}

function decode (value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    console.error(e);
  }
}

// 设置cookie
export function setCookie ({ name, path = '/', value, expires }) {
  const date = new Date();
  date.setTime(date.getTime() + expires);
  // 请使用 toUTCString 而非 toGMTString，toGMTString已废弃
  const cookie = `${name}=${encode(value)};expires=${date.toUTCString()};path=${path}`;
  document.cookie = cookie;
}

// 获取 cookie
export function getCookie (name) {
  // 之所以没有使用 pair.split('=')的形式取 key 和 value，是因为 cookie 可能有这种情况 "o2Control=webp|lastvisit=1"
  const pairs = document.cookie.split(/; */);
  
  for (let i = 0; i < pairs.length; ++i) {
    const pair = pairs[i];
    let eqIdx = pair.indexOf('=');
    
    // 如果不是 key=value 的情况则忽略
    if (eqIdx < 0) {
      continue;
    }
    
    const key = pair.substr(0, eqIdx).trim();
    let val = pair.substr(++eqIdx, pair.length).trim();
    
    // cookie 有双引号的情况
    if (val[0] === '"') {
      val = val.slice(1, -1);
    }
    
    if (key === name) {
      return decode(val);
    }
  }
  return '';
}
