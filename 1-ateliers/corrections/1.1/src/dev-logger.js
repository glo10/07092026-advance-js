
export const devLogger = {
  appName: "SaaS-App",
  log(level, message, timestamp) {
    return `[${this.appName}] [${level.toUpperCase()}] (${timestamp}) : ${message}`;
  }
};
