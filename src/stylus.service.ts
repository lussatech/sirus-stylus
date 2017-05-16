import { Injectable } from '@angular/core';

/**
 * Service to provide MyScript cloud service credentials
 * 
 * @export
 * @class StylusService
 */
@Injectable()
export class StylusService {
  constructor(
    readonly applicationKey: string, 
    readonly hmacKey: string,
    readonly host?: string
  ) {}
}
