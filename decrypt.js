(() => {
  'use strict';
  const status = document.getElementById('status');
  const detail = document.getElementById('detail');
  const retry = document.getElementById('retry');
  let busy = false;
  function fail(message, explanation) {
    status.textContent = message;
    detail.textContent = explanation;
    retry.hidden = false;
  }
  async function unlock() {
    if (busy) return;
    const fragment = new URLSearchParams(location.hash.slice(1));
    const encodedKey = fragment.get('k') || '';
    if (!encodedKey) {
      fail('请打开完整的家庭专用链接', '当前只是加密入口，没有解锁凭证。请使用Owner在家庭中保管的完整链接；无需下载HTML。');
      return;
    }
    if (!/^[A-Za-z0-9_-]{43}$/.test(encodedKey)) {
      fail('家庭链接不完整', '请重新打开Owner保管的原始完整链接，不要手动删改后半段。');
      return;
    }
    if (!isSecureContext || !crypto.subtle) {
      fail('请用最新版Safari、Chrome或Edge打开HTTPS链接', '当前浏览器没有可用的安全解密能力，尚未读取题目。');
      return;
    }
    busy = true;
    retry.hidden = true;
    status.textContent = '正在解锁家庭练习…';
    detail.textContent = '只读取本站加密题包，不把解锁凭证或作答发送给其他网站。';
    try {
      const keyBytes = Uint8Array.from(atob(encodedKey.replace(/-/g, '+').replace(/_/g, '/') + '='), c => c.charCodeAt(0));
      if (keyBytes.byteLength !== 32) throw new Error('INVALID_KEY');
      const key = await crypto.subtle.importKey('raw', keyBytes, {name:'AES-GCM'}, false, ['decrypt']);
      keyBytes.fill(0);
      const response = await fetch(new URL('payload.enc', location.href), {credentials:'omit', referrerPolicy:'no-referrer'});
      if (!response.ok) throw new Error('PAYLOAD_UNAVAILABLE');
      const bundle = new Uint8Array(await response.arrayBuffer());
      if (bundle.byteLength < 29 || bundle.byteLength > 20 * 1024 * 1024) throw new Error('INVALID_BUNDLE');
      const plaintext = await crypto.subtle.decrypt({name:'AES-GCM', iv:bundle.slice(0,12), additionalData:new TextEncoder().encode('KET_FAMILY_MIRROR_V1'), tagLength:128}, key, bundle.slice(12));
      const html = new TextDecoder('utf-8', {fatal:true}).decode(plaintext);
      if (!/^<!doctype html>/i.test(html) || !html.includes('id="sourceData"')) throw new Error('INVALID_CONTENT');
      document.open();
      document.write(html);
      document.close();
    } catch (_) {
      busy = false;
      fail('暂时未能解锁题目', '请核对家庭完整链接是否正确，并确认网络能读取本站题包。错误或被修改的题包不会显示任何试题。');
    }
  }
  retry.addEventListener('click', unlock);
  window.addEventListener('hashchange', unlock);
  unlock();
})();
