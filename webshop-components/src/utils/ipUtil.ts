const IP_PATTERN = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

export const findIP = new Promise(r => {
  const w = window as any;
  const conn = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] });
  const noop = () => { };
  conn.createDataChannel('');
  conn.createOffer(c => conn.setLocalDescription(c, noop, noop), noop);
  conn.onicecandidate = c => {
    try {
      c.candidate.candidate.match(IP_PATTERN)
      .forEach(r) }
    catch (e) { }
  }
});

export const getCurrentIP = (): Promise<string> =>
  Promise.resolve(findIP.then(ip => ip as string).catch(e => e as string));
