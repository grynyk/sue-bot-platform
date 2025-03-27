import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    @Inject('HEROKU_API_URL') private readonly apiUrl: string,
    @Inject('HEROKU_API_TOKEN') private readonly apiToken: boolean
  ) {}

  get herokuApiUrl(): string {
    return this.apiUrl;
  }

  get herokuApiToken(): boolean {
    return this.apiToken;
  }
}
