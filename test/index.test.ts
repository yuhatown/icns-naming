import { bech32ToICNS, ICNSToBech32 } from '../src/index';  // Please adjust the import path according to your project structure
import fetch, { FetchMock } from 'jest-fetch-mock';

jest.mock('node-fetch', () => require('jest-fetch-mock'));

describe('ICNS Conversion', () => {

    beforeEach(() => {
        (fetch as FetchMock).resetMocks();
    });

    it('converts bech32 to ICNS', async () => {
        const mockResponse: string = '{"data": {"name": "dogemos.osmo"}}';

        (fetch as FetchMock).mockResponseOnce(mockResponse);

        const result = await bech32ToICNS('osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5');

        expect(result).toEqual('dogemos.osmo');
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('converts ICNS to bech32', async () => {
        const mockResponse: string = '{"data": {"bech32_address": "osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5"}}';

        (fetch as FetchMock).mockResponseOnce(mockResponse);

        const result = await ICNSToBech32('dogemos.osmo');

        expect(result).toEqual('osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5');
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
