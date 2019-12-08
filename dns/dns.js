const dns = require("dns");
dns.lookup('registry.yarnpkg.com', err => {
  console.log(err)
  // let proxy;
  // if (err != null && (proxy = getProxy())) {
  //   // If a proxy is defined, we likely can't resolve external hostnames.
  //   // Try to resolve the proxy name as an indication of a connection.
  //   dns.lookup(url.parse(proxy).hostname, proxyErr => {
  //     resolve(proxyErr == null);
  //   });
  // } else {
  //   resolve(err == null);
  // }
});