export const trim = (target) => {
  if (typeof target === 'string') {
    return target.replace(/^\s*|\s*$/g, '');
  }
  return target;
}

export const injectScript = ({fromUrl, src, remove}) => {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;

  if (fromUrl) {
      s.src = src;
  } else {
      s.innerText = src;
  }
  
  const t = document.getElementsByTagName('body')[0];
  t.appendChild(s);

  // we just remove it as a macro task
  // this may cause some problems in your program, be cautious
  if (remove) {
      setTimeout(() => {
          t.removeChild(s);
      })
  }
}

const formatDigit = (digit) => {
  const digitInStr = String(digit);
  return digitInStr.length === 1 ? ('0' + digitInStr) : digitInStr;
}

export const formatTime = (time, format = '') => {
  let date = null;
  if (time instanceof Date) {
    date = time;
  } else {
    date = new Date(time);
  }
  const fo = {
    year: formatDigit(date.getFullYear()),
    month: formatDigit(date.getMonth() + 1),
    date: formatDigit(date.getDate()),
    hour: formatDigit(date.getHours()),
    minute: formatDigit(date.getMinutes()),
    second: formatDigit(date.getSeconds()),
    millisecond: formatDigit(date.getMilliseconds())
  }

  switch(format) {
    case 'ymd':
      return `${fo.year}.${fo.month}.${fo.date}`;
    case 'hms':
      return `${fo.hour}:${fo.minute}:${fo.second}`;
    case 'full':
      return `${fo.year}.${fo.month}.${fo.date} ${fo.hour}:${fo.minute}:${fo.second}`;
    default:
      return fo
  }
}
