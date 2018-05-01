import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {
  private _ENV: string = 'production';

  private _CONFIG = {
    local: {
      apiRoot: 'http://upload.test'
    },
    production: {
      apiRoot: 'https://upload-api.geekity.com'
    }
  };

  get env(): string {
    if (undefined === window || undefined === window.location.hostname) {
      return this._ENV;
    }

    if ('localhost' === window.location.hostname) {
      return 'local';
    }

    return this._ENV;
  }

  get apiRoot(): string {
    return this._CONFIG[this.env].apiRoot;
  }

  get version(): string {
    return '1.0.0';
  }
}
