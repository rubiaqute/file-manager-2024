import { homedir } from "os";
import { up, ls, cd, osSystem } from "./command-handlers/index.js";
import { ERROR_MESSAGE } from "./operation-error.js";

const { stdin, stdout, argv } = process;

let currentPath = homedir();
const userName = argv.slice(argv.length - 1)[0].split("=")[1];

stdout.write(`Welcome to the File Manager, ${userName}!\n`);
console.log(`You are currently in ${currentPath}`);

stdin.on("data", async (command) => {
  try {
    const action = command.toString().trim();

    switch (action) {
      case "up": {
        currentPath = up(currentPath);
        break;
      }

      case "ls": {
        ls(currentPath);
        break;
      }

      case ".exit": {
        stdout.write(
          `\nThank you for using File Manager, ${userName}!`
        );
        process.exit();
      }


      default: {
        if (action.startsWith("cd ")) {
          const pathName = action.slice(3);
          const newPath = await cd(pathName, currentPath);
          if (newPath) currentPath = newPath;
          break;
        }

        if (action.startsWith("rn ")) {
          const argsString = action.slice(3);
          rn(argsString, currentPath);
          break;
        }

        if (action.startsWith("os ")) {
          const argsString = action.slice(3);
          osSystem(argsString);
          break;
        }

        if (action.startsWith("cat ")) {
          const argsString = action.slice(4);
          read(argsString, currentPath);
          break;
        }

        if (action.startsWith("add ")) {
          const argsString = action.slice(4);
          add(argsString, currentPath);
          break;
        }

        if (action.startsWith("cp ")) {
          const argsString = action.slice(3);
          copy(argsString, currentPath);
          break;
        }

        if (action.startsWith("mv ")) {
          const argsString = action.slice(3);
          move(argsString, currentPath);
          break;
        }

        if (action.startsWith("rm ")) {
          const argsString = action.slice(3);
          remove(argsString, currentPath);
          break;
        }

        if (action.startsWith("hash ")) {
          const argsString = action.slice(5);
          hash(argsString, currentPath);
          break;
        }

        if (action.startsWith("compress ")) {
          const argsString = action.slice(9);
          compress(argsString, currentPath);
          break;
        }
        
        if (action.startsWith("decompress ")) {
          const argsString = action.slice(11);
          decompress(argsString, currentPath);
          break;
        }

        console.log("Invalid input");
        break;
      }
    }
  } catch {
    console.log(ERROR_MESSAGE);
  } finally {
    console.log(`You are currently in ${currentPath}`);
  }
});

process.on('uncaughtException', () => console.log(ERROR_MESSAGE));

process.on("SIGINT", () => {
  stdout.write(`\nThank you for using File Manager, ${userName}!`);
  process.exit();
});
