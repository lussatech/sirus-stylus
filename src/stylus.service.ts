import { Injectable } from '@angular/core';

@Injectable()
export class StylusService {
  constructor(
    readonly applicationKey: string, 
    readonly hmacKey: string,
    readonly host?: string
  ) {}
}

export let StylusServiceProvider = { 
    provide: StylusService,
    useFactory: (applicationKey: string, hmacKey: string, host?: string) => {
      return new StylusService(applicationKey, hmacKey, host);
    }
  };
