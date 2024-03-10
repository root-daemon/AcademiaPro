import("virtual:pwa-register")
  .then((a) => a.registerSW)
  .then((registerSW) => {
    registerSW({
      
      immediate: true,
      onRegisteredSW(swScriptUrl) {
        console.log("SW registered: ", swScriptUrl);
      },
      onOfflineReady() {
        console.log("PWA application ready to work offline");
      },
    });
  });
