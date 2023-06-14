import { bech32ToIcns, icnsToBech32 } from '../src/index'; 

describe('bech32ToIcns', () => {
  it('returns name when given a valid address', async () => {
    const result = await bech32ToIcns('osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5');
    expect(result).toBe('dogemos');  
  });
});

describe('icnsToBech32', () => {
  it('returns address when given a valid ICNS', async () => {
    const result = await icnsToBech32('dogemos.osmo');
    expect(result).toBe('osmo1z98eg2ztdp2glyla62629nrlvczg8s7f8sgpm5');  
  });
});
