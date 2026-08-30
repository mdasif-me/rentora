import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import type { Lead } from '@rentora/types';

@Injectable()
export class AutomationListeners {
  private readonly logger = new Logger(AutomationListeners.name);

  @OnEvent('lead.created', { async: true })
  async handleLeadCreatedNotification(payload: Lead) {
    this.logger.log(
      `[Webhook Triggered] Sending Admin Notification for Lead ID: ${payload.id}`,
    );

    // Simulate webhook API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.logger.log(
      `[Webhook Success] Admin notified about new inquiry for vehicle ID: ${payload.vehicleId}`,
    );
  }

  @OnEvent('lead.created', { async: true })
  async handleLeadCreatedEmail(payload: Lead) {
    this.logger.log(
      `[Email Triggered] Sending confirmation email to ${payload.email}`,
    );

    // Simulate email API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    this.logger.log(
      `[Email Success] Confirmation sent to ${payload.firstName} ${payload.lastName}`,
    );
  }
}
