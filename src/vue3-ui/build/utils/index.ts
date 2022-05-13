import { spawn } from 'child_process'
import { projectRootPath } from './paths';
// 打包的时候会展示当前任务名称
export const widthTaskName = (taskName: string, fn ) => Object.assign(fn, { displayName: taskName  } );

// 在node中使用子进程运行脚本
export const run = async (command: string) => {
    return new Promise((resolve) => {
        const [ cmd, ...args ] = command.split(' ');
        // 执行命令
        const childApp = spawn(cmd, args, {
            cwd: projectRootPath,
            stdio: 'inherit', // 将当前子进程共享给父进程
            shell: true, // 默认情况喜爱 linux 才支持 rm -rf （mac 可以不用这个配置，直接运行命令）
        });
        // 项目执行完 回调
        childApp.on('close', resolve)
    })
}