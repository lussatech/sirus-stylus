# sirus-stylus

Stylus input text recognition module for angular

## Installation

To install this library, run:

```bash
$ npm install @sirus/stylus --save
```

## Usage

Once you have published your library to npm, you can import this module in any Angular application by running:

```bash
$ npm install @sirus/stylus
```

and then from your Angular `AppModule`:

```typescript
import { SirusStylusModule } from '@sirus/stylus';

@NgModule({
  imports: [
    SirusStylusModule.forRoot(
      'APPLICATION_KEY',
      'HMAC_KEY',
      'HOST' // default to webdemoapi.myscript.com
    )
  ]
})
export class AppModule { }
```

Then from your application template, you can start using `stylus` component

```xml
<sirus-stylus
  [pen]="pen" 
  height="200" 
  width="270" 
  language="id_ID" 
  (onResult)="writeRecognition($event)"
  (onInkChange)="inkChange($event)">
</sirus-stylus>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [muhammad hasan](mailto:hasan@lussa.net)
