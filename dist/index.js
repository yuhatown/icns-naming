var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
function performQuery(queryObject, resolverAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const base64 = Buffer.from(JSON.stringify(queryObject)).toString('base64');
        const finallyQuery = `https://lcd-osmosis.keplr.app/cosmwasm/wasm/v1/contract/${resolverAddress}/smart/${base64}`;
        const response = yield fetch(finallyQuery);
        if (!response.ok) {
            throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`);
        }
        const data = yield response.json();
        return data;
    });
}
function queryAndExtractField(queryObject, resolverAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const convertAddress = yield performQuery(queryObject, resolverAddress);
        if (convertAddress) {
            if ('name' in convertAddress.data) {
                return convertAddress.data.name;
            }
            if ('bech32_address' in convertAddress.data) {
                return convertAddress.data.bech32_address;
            }
        }
    });
}
export function bech32ToICNS(address, resolverAddress) {
    return queryAndExtractField({ "primary_name": { "address": address } }, resolverAddress);
}
export function ICNSToBech32(icns, resolverAddress) {
    return queryAndExtractField({ "address_by_icns": { "icns": icns } }, resolverAddress);
}
