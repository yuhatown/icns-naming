const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

interface QueryResponse {
    data: {
        name?: string;
        bech32_address?: string;
    }
}

async function performQuery(jsonQuery: string): Promise<QueryResponse | undefined> {
    const base64: string = btoa(jsonQuery);
    const finallyQuery: string = `https://lcd-osmosis.keplr.app/cosmwasm/wasm/v1/contract/${process.env.RESOLVER_ADDRESS}/smart/${base64}`;

    try {
        const response = await axios.get(finallyQuery);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to perform query: ${error}`);
    }
}

export async function bech32ToIcns(address: string): Promise<string | undefined> {
    const jsonQuery: string = `{"primary_name": {"address": "${address}"}}`;
    const data: QueryResponse | undefined = await performQuery(jsonQuery);

    if (data) {
        const result: string | undefined = data.data.name;
        console.log(result);
        return result;
    }
}

export async function icnsToBech32(icns: string): Promise<string | undefined> {
    const jsonQuery: string = `{"address_by_icns": {"icns": "${icns}"}}`;
    const data: QueryResponse | undefined = await performQuery(jsonQuery);
    
    if (data) {
        const result: string | undefined = data.data.bech32_address;
        console.log(result);
        return result;
    }
}
