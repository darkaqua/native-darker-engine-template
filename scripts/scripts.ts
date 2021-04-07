import { exec } from 'child_process';
import * as colors from "colors";
import * as scripts from './scripts.json';

(async () => {

    const scriptName = process.argv[2];
    const script = scripts.find(script => script.name === scriptName);
    
    console.log(colors[script.color](`            [${script.name}]            `));

    const commands = () => {
        script.commands.forEach(({ name, color, cmd }: any) => {
            const _fork = exec(cmd);

            const preTitle = colors[color](`[${name}]`) + ': ';

            console.log(`${preTitle} > ${name}`);
            _fork.stdio
            _fork.stdout.on('data', (message) => {
                process.stdout.write(preTitle + message.toString());
            });
            _fork.stderr.on('data', (message) => {
                process.stdout.write(preTitle + message.toString());
            });
            _fork.stdout.on('close', () => {
                console.log(`${preTitle} <`)
            });
        });
    }

    const preCommandsLength = script.preCommands.length;

    const recursivePreCommand = (index: number = 0) => {
        const execStr = script.preCommands[index];
        const _fork = exec(execStr);

        const position = `${index + 1}/${preCommandsLength}`;
        const preTitle = colors[script.color](`[pre-start ${position}]`) + ': ';

        console.log(`${preTitle} > ${execStr}`);
        _fork.stdout.on('data', (message) => {
            process.stdout.write(preTitle + message.toString());
        });
        _fork.stdout.on('close', () => {
            if(index >= preCommandsLength - 1)
                return commands();
            recursivePreCommand(index + 1);
        });
    }
    recursivePreCommand();

})();
