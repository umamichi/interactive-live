require('isomorphic-fetch');

const sendEnquete = (text) => {
  const myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');
  myHeaders.append('content-type', 'application/json');

  const myInit = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: myHeaders,
    body: JSON.stringify({
      channel: '#general', 
      username: '馬道まさたか INTERACTIVE LIVE アンケート',
      text
    })
  };

  const myRequest = new Request('https://hooks.slack.com/services/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');

  fetch(myRequest, myInit)
  .then((response) => {
    response.json().then((json) => {
      return ({ json, response });
    });
  }).then((json, response) => {
    console.log(json);
    console.log(response.ok);
  });
};

module.exports = sendEnquete;
