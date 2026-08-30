import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { createObserveModule } from '@nestjs/observe';

import { AiModule } from './ai/ai.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AutomationModule } from './automation/automation.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { LeadsModule } from './leads/leads.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SupabaseModule } from './supabase/supabase.module.js';
import { VehiclesModule } from './vehicles/vehicles.module.js';
import { CategoriesModule } from './categories/categories.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

const observeKey = process.env.OBSERVE_APP_KEY;
const observeSecret = process.env.OBSERVE_APP_SECRET;
const isObserveEnabled = Boolean(
  observeKey &&
  observeSecret &&
  observeKey !== 'YOUR_APP_KEY' &&
  observeSecret !== 'YOUR_APP_SECRET',
);

@Module({
  imports: [
    ...(isObserveEnabled
      ? [
          ObserveModule.forRoot({
            appKey: observeKey!,
            appSecret: observeSecret!,
            serviceId: 'ssr',
          }),
        ]
      : []),
    EventEmitterModule.forRoot(),
    PrismaModule,
    VehiclesModule,
    DashboardModule,
    LeadsModule,
    AiModule,
    AutomationModule,
    SupabaseModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
