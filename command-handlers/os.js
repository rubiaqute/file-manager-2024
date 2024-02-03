import * as os from "os";

export const osSystem = (arg) => {
  switch (arg) {
    case "--EOL": {
      console.log(JSON.stringify(os.EOL));
      break;
    }
    case "--cpus": {
      console.log(`Total amount od CPUS is ${os.cpus().length}`);
      console.table(
        os.cpus().map((el) => {
          return { model: el.model, clockRate: Math.round(el.speed / 100) / 10 };
        })
      );
      break;
    }
    case "--homedir": {
      console.log(`Your homedir is ${os.homedir()}`);
      break;
    }
    case "--username": {
      console.log(`Your system username is ${os.userInfo().username}`);
      break;
    }
    case "--architecture": {
      console.log(`Your CPU architecture is ${os.arch()}`);
      break;
    }
    default: {
      console.log("Invalid input");
      break;
    }
  }
};
