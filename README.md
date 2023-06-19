# ICNS-naming
Inter Chain Name Service

## Introduction
Welcome to the ICNS-naming documentation! 
ICNS-naming is a library that converts Bech32 addresses to ICNS, or ICNS addresses to Bech32.

## Installation

### Package manager

Using npm:
```
$ npm i icns-naming
```

Once the package is installed, you can import the library:
```
import { bech32ToICNS, ICNSToBech32 } from 'icns-naming';
```


## Example
```
async function ICNSName() {
    const resolverAddress = 'osmo1xk0s8xgktn9x5vwcgtjdxqzadg88fgn33p8u9cnpdxwemvxscvast52cdd';
    const bech32Address = 'osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5';

    const name = await bech32ToICNS(bech32Address, resolverAddress);
    console.log(name);
}
```

Result:
```
dogemos
```