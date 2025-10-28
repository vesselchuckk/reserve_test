import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [BookingsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
