/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '~/entities'
import { EmailController } from '~/modules/email/email.controller'
import { EmailService } from '~/modules/email/email.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
