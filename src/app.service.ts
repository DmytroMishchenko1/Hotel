import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTaskInfo(): string {
    return `<h1>An endpoint that returns a list of hotels near given coordinates (e.g. 48.130323,11.576362)</h1><h1>An endpoint to create a new booking for a given hotel</h1><h1>An endpoint to list bookings for a given hotel (no authentication needed)</h1>`;
  }
}
