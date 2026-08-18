import { Controller, Post } from '@nestjs/common';

@Controller('chaos')
export class ChaosController {
  @Post('hang')
  hang() {
    // Responde 200 e após 1s trava o event loop
    setTimeout(() => {
      while (true) {}
    }, 1000);

    return { message: 'App will hang in 1 second' };
  }
}
