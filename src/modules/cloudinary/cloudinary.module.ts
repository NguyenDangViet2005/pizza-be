// cloudinary.module.ts
import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService], // ✅ xuất ra để module khác dùng
})
export class CloudinaryModule {}
