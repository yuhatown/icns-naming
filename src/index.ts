import fetch from "node-fetch";

interface ICNSResponse {
  data: {
    name: string;
  };
}

interface Bech32Response {
  data: {
    bech32_address: string;
  };
}

type QueryResponse = ICNSResponse | Bech32Response;

async function performQuery(
  baseUrl: string,
  queryObject: object,
  resolverAddress: string
): Promise<QueryResponse | undefined> {
  const base64: string = Buffer.from(JSON.stringify(queryObject)).toString(
    "base64"
  );
  const finallyQuery: string = `${baseUrl}${resolverAddress}/smart/${base64}`;

  const response = await fetch(finallyQuery);

  if (response.status !== 200) {
    throw new Error(
      `HTTP Error Response: ${response.status} ${response.statusText}`
    );
  }

  const data: QueryResponse = (await response.json()) as QueryResponse;

  return data;
}

async function queryAndExtractField(
  baseUrl: string,
  queryObject: object,
  resolverAddress: string
): Promise<string | undefined> {
  const convertAddress = await performQuery(
    baseUrl,
    queryObject,
    resolverAddress
  );

  if (convertAddress) {
    if ("name" in convertAddress.data) {
      return convertAddress.data.name;
    }
    if ("bech32_address" in convertAddress.data) {
      return convertAddress.data.bech32_address;
    }
  }
}

export function bech32ToICNS(
  baseUrl: string,
  address: string,
  resolverAddress: string
): Promise<string | undefined> {
  return queryAndExtractField(
    baseUrl,
    { primary_name: { address: address } },
    resolverAddress
  );
}

export function ICNSToBech32(
  baseUrl: string,
  icns: string,
  resolverAddress: string
): Promise<string | undefined> {
  return queryAndExtractField(
    baseUrl,
    { address_by_icns: { icns: icns } },
    resolverAddress
  );
}
