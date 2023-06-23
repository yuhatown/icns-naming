var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
function performQuery(baseUrl, queryObject, resolverAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const base64 = Buffer.from(JSON.stringify(queryObject)).toString("base64");
        const finallyQuery = `${baseUrl}${resolverAddress}/smart/${base64}`;
        const response = yield fetch(finallyQuery);
        if (response.status !== 200) {
            throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`);
        }
        const data = (yield response.json());
        return data;
    });
}
function queryAndExtractField(baseUrl, queryObject, resolverAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const convertAddress = yield performQuery(baseUrl, queryObject, resolverAddress);
        if (convertAddress) {
            if ("name" in convertAddress.data) {
                return convertAddress.data.name;
            }
            if ("bech32_address" in convertAddress.data) {
                return convertAddress.data.bech32_address;
            }
        }
    });
}
export function bech32ToICNS(baseUrl, address, resolverAddress) {
    return queryAndExtractField(baseUrl, { primary_name: { address: address } }, resolverAddress);
}
export function ICNSToBech32(baseUrl, icns, resolverAddress) {
    return queryAndExtractField(baseUrl, { address_by_icns: { icns: icns } }, resolverAddress);
}
