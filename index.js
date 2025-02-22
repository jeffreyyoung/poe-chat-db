const cache = new Map();

        async function asyncPoeCall(json) {
            console.log('Making Poe API call:', JSON.stringify(json, null, 2));
            const startTime = performance.now();
            const id = Math.random() + '';
            const deferred = createDeferred();
            window.Poe.registerHandler(id, (data) => {
                if (data.responses.length < 1) {
                    console.error('No response received from Poe API');
                    deferred.reject(new Error("No response"))
                    return;
                }
                let response = data.responses[0];
                if (response.status === "error") {
                    console.error('Poe API error:', response.statusText);
                    deferred.reject(new Error(response.statusText));
                    return;
                }
                try {
                    const result = JSON.parse(response.content);
                    const endTime = performance.now();
                    console.log('Poe API call completed in', (endTime - startTime).toFixed(2), 'ms');
                    console.log('Response:', JSON.stringify(result, null, 2));
                    deferred.resolve(result);
                } catch (e) {
                    console.error('Error parsing Poe API response:', e);
                    deferred.reject(e);
                }
            });
            try {
                console.log('Sending message to ChatDB1:', JSON.stringify(json));
                await window.Poe.sendUserMessage("@ChatDB1 " + JSON.stringify(json), { handler: id, stream: false });
            } catch (e) {
                console.error('Error sending message to ChatDB1:', e);
                deferred.reject(e);
            }
            return deferred.promise;
        }

        window.poeDb = {
            async get(key) {
                console.log('Getting value for key:', key);
                const startTime = performance.now();
                try {
                    const result = await asyncPoeCall({ operation: "get", key }).then(obj => obj.value);
                    const endTime = performance.now();
                    console.log('Retrieved value for key:', key, 'in', (endTime - startTime).toFixed(2), 'ms');
                    console.log('Value:', JSON.stringify(result, null, 2));
                    return result;
                } catch (e) {
                    console.error('Error getting value for key:', key, e);
                    throw e;
                }
            },
            async set(key, value) {
                console.log('Setting value for key:', key);
                console.log('Value:', JSON.stringify(value, null, 2));
                const startTime = performance.now();
                try {
                    const result = await asyncPoeCall({ operation: "put", key, value }).then(obj => obj.value);
                    const endTime = performance.now();
                    console.log('Set value for key:', key, 'in', (endTime - startTime).toFixed(2), 'ms');
                    return result;
                } catch (e) {
                    console.error('Error setting value for key:', key, e);
                    throw e;
                }
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
