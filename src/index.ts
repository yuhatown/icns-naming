import fetch from 'node-fetch';

const RESOLVER_ADDRESS='osmo1xk0s8xgktn9x5vwcgtjdxqzadg88fgn33p8u9cnpdxwemvxscvast52cdd'

interface QueryResponse {
    data: {
        name?: string;
        bech32_address?: string;
    }
}

async function performQuery(jsonQuery: string): Promise<QueryResponse | undefined> {
    const base64: string = Buffer.from(jsonQuery).toString('base64');
    const finallyQuery: string = `https://lcd-osmosis.keplr.app/cosmwasm/wasm/v1/contract/${RESOLVER_ADDRESS}/smart/${base64}`;

    try {
        const response = await fetch(finallyQuery);

        if (!response.ok) {
            console.error(`HTTP Error Response: ${response.status} ${response.statusText}`);
            return undefined;
        }
        const data: QueryResponse = await response.json() as QueryResponse;

        return data;
    } catch (error: any) {
        console.error(`Failed to perform query: ${error}`);
    }
}

export async function bech32ToICNS(address: string): Promise<string | undefined> {
    const jsonQuery: string = `{"primary_name": {"address": "${address}"}}`;
    const convertAddress: QueryResponse | undefined = await performQuery(jsonQuery);

    if (convertAddress) {
        const result: string | undefined = convertAddress.data.name;
        return result;
    }
}

export async function ICNSToBech32(icns: string): Promise<string | undefined> {
    const jsonQuery: string = `{"address_by_icns": {"icns": "${icns}"}}`;
    const convertAddress: QueryResponse | undefined = await performQuery(jsonQuery);
    
    if (convertAddress) {
        const result: string | undefined = convertAddress.data.bech32_address;
        return result;
    }
}
