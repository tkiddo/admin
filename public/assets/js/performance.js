/*
 * @Author: tkiddo
 * @Date: 2021-03-05 10:54:39
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-03-05 13:02:24
 * @Description:
 */
function collectData() {
  const times = {};
  const t = performance.getEntriesByType('navigation')[0];

  //重定向时间
  times.redirectTime = t.redirectEnd - t.redirectStart;

  //dns查询耗时
  times.dnsTime = t.domainLookupEnd - t.domainLookupStart;

  //TTFB 读取页面第一个字节的时间
  times.ttfbTime = t.responseStart - t.requestStart;

  //DNS 缓存时间
  times.appcacheTime = t.domainLookupStart - t.fetchStart;

  //卸载页面的时间
  times.unloadTime = t.unloadEventEnd - t.unloadEventStart;

  //tcp连接耗时
  times.tcpTime = t.connectEnd - t.connectStart;

  //request请求耗时
  times.reqTime = t.responseEnd - t.responseStart;

  //解析dom树耗时
  times.analysisTime = t.domComplete - t.domInteractive;

  //白屏时间
  times.blankTime = t.responseEnd - t.fetchStart;

  //首次可交互时间
  times.firstInteract = t.domInteractive - t.fetchStart;

  //domReadyTime
  times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart;

  //测量开始时间
  times.origin = performance.timeOrigin;

  const formData = new FormData();
  Object.keys(times).forEach((key) => {
    let value = times[key];
    if (typeof value !== 'string') {
      // formData只能append string 或 Blob
      value = JSON.stringify(value);
    }
    formData.append(key, value);
  });

  return formData;
}
function logData() {
  navigator.sendBeacon('/admin/api/performance', collectData());
}
window.addEventListener('unload', logData);