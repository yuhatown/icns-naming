import { bech32ToICNS, ICNSToBech32 } from '../src/index';  
import fetchMock from 'jest-fetch-mock';


describe('bech32ToICNS', () => {
  it('should return the correct name', async () => {
    const mockResponse = {
      data: {
        name: 'dogemos.osmo'
      }
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const result = await bech32ToICNS('osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5');
    console.log(result);
    
    expect(result).toEqual('dogemos.osmo');
  });
});

describe('ICNSToBech32', () => {
  it('should return the correct address', async () => {
    const mockResponse = {
      data: {
        bech32_address: 'osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5'
      }
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const result = await ICNSToBech32('dogemos.osmo');
    expect(result).toEqual('osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5');
  });
});

afterEach(() => {
  fetchMock.resetMocks();
});
