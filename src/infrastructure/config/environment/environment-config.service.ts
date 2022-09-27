import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  private readonly _connectionString: string;

  get connectionString(): string {
    return this._connectionString;
  }
  constructor(private readonly _configService: ConfigService) {
    this._connectionString = this._getConnectionStringFormEnvFile();
  }

  private _getConnectionStringFormEnvFile() {
    const connectionString = this._configService.get<string>('DATABASE_URI');
    if (!connectionString) {
      throw new Error('No connection string has been provided in the .env file.');
    }
    return connectionString;
  }
}
