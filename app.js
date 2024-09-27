submitToken.addEventListener("click", async () => {
    const callClient = new CallClient();
    const userTokenCredential = userToken.value;
      try {
        tokenCredential = new AzureCommunicationTokenCredential(userTokenCredential);
        callAgent = await callClient.createCallAgent(tokenCredential);
        deviceManager = await callClient.getDeviceManager();
        await deviceManager.askDevicePermission({ audio: true });
        callButton.disabled = false;
        submitToken.disabled = true;
        // Listen for an incoming call to accept.
        callAgent.on('incomingCall', async (args) => {
          try {
            incomingCall = args.incomingCall;
            acceptCallButton.disabled = false;
            callButton.disabled = true;
          } catch (error) {
            console.error(error);
          }
        });
      } catch(error) {
        window.alert("Please submit a valid token!");
      }
  })