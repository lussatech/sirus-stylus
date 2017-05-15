import { Injectable } from '@angular/core';

@Injectable()
export class StylusService {
  constructor(
    readonly applicationKey: string, 
    readonly hmacKey: string,
    readonly host?: string
  ) {}
}
