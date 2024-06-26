function isScriptLoaded(url: string): boolean {
  const scripts = document.getElementsByTagName('script');
  // eslint-disable-next-line no-plusplus
  for (let i = scripts.length; i--; ) {
    if (scripts[i].src === url) return true;
  }

  return false;
}

export function loadScript(srcScript: string, alreadyOnWindow?: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!alreadyOnWindow && !isScriptLoaded(srcScript)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = srcScript;
      script.onload = () => {
        resolve();
      };
      script.onerror = error => {
        reject(error);
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      resolve();
    }
  });
}
