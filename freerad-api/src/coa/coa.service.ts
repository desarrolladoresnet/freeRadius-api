import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class CoaService {
  async CoA_cmd(data: any): Promise<string> {
    const { cmd } = data;
    return new Promise<string>((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error}`);
          reject(error);
        } else if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(stderr);
        } else {
          console.log(`stdout: ${stdout}`);
          resolve(stdout);
        }
      });
    });
  }
}

/*
@Injectable()
export class CoaService {
  async CoA_cmd(data: any) {
    const { cmd } = data;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else {
        console.log(stdout);
				return stdout;
      }
    });
  }
}
*/
