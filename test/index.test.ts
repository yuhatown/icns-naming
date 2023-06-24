import { bech32ToICNS, ICNSToBech32 } from "../src/index";
import fetchMock from "jest-fetch-mock";

describe("bech32ToICNS", () => {
  it("should return the correct name", async () => {
    const mockResponse = {
      data: {
        name: "dogemos.osmo",
      },
    };
    const bech32_address = "osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5";
    const resolver_address =
      "osmo1xk0s8xgktn9x5vwcgtjdxqzadg88fgn33p8u9cnpdxwemvxscvast52cdd";
    const baseUrl = "https://lcd-osmosis.keplr.app/cosmwasm/wasm/v1/contract/";

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const result = await bech32ToICNS(
      baseUrl,
      bech32_address,
      resolver_address
    );
    console.log(result);

    expect(result).toEqual("dogemos.osmo");
  });
});

describe("ICNSToBech32", () => {
  it("should return the correct address", async () => {
    const mockResponse = {
      data: {
        bech32_address: "osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5",
      },
    };
    const icns_address = "dogemos.osmo";
    const resolver_address =
      "osmo1xk0s8xgktn9x5vwcgtjdxqzadg88fgn33p8u9cnpdxwemvxscvast52cdd";
    const baseUrl = "https://lcd-osmosis.keplr.app/cosmwasm/wasm/v1/contract/";

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const result = await ICNSToBech32(baseUrl, icns_address, resolver_address);
    expect(result).toEqual("osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5");
  });
});

afterEach(() => {
  fetchMock.resetMocks();
});
