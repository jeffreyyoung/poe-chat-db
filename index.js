const cache = new Map();


function asyncPoeCall(json) {
  const id = Math.random() + '';
  const deferred = createDeferred();
  window.Poe.registerHandler(id, (data) => {
      if (data.responses.length < 1) {
        deferred.reject(new Error("No response"))
        return;
      }
      let response = data.responses[0];
      if (response.status === "error") {
        deferred.reject(new Error(response.statusText));
        return;
      }
      try {
        
        deferred.resolve(JSON.parse(response.content));
      } catch (e) {
        deferred.reject(e);
      }
  });
  try {
    await window.Poe.sendUserMessage(JSON.stringify(json));
  } catch (e) {
    deferred.reject(e);
  }
  return deferred;
  
}


window.poeDb = {
  get(key) {
    return asyncPoeCall({ operation: "get", key }).then(obj => obj.value);
    
  },
  set(key, value) {
    return asyncPoeCall({ operation: "put", key, value }).then(obj => obj.value);
  }
  
}


function createDeferred() {
  let resolve, reject;
  
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject
  };
}
