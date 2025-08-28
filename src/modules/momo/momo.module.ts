import { MomoController } from '~/modules/momo/momo.controller'
import { MomoService } from './momo.service'
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [MomoController],
  providers: [MomoService],
})
export class MomoModule {}
