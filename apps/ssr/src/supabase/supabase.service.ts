import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      this.logger.warn(
        '⚠️ Supabase URL or Key is missing from environment variables. ' +
          'Image uploads will fail until SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.',
      );
    }

    // Provide dummy values if missing to prevent the server from crashing on boot
    this.supabase = createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseKey || 'placeholder_key',
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async uploadImage(
    file: any,
    bucket: string = 'vehicles',
  ): Promise<string | null> {
    if (!file) return null;

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        'Supabase credentials are not configured. Cannot upload image.',
      );
    }

    try {
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      this.logger.error('Error uploading image to Supabase', error);
      throw error;
    }
  }
}
