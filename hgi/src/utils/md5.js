export function md5(input) {
    function rotateLeft(n, s) {
        return (n << s) | (n >>> (32 - s));
    }
    function toBytes(input) {
        const bytes = [];
        for (let i = 0; i < input.length; i++) {
            bytes.push(input.charCodeAt(i));
        }
        return bytes;
    }
    const k = [];
    for (let i = 0; i < 64; i++) {
        k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
    }
    let a0 = 0x67452301;
    let b0 = 0xefcdab89;
    let c0 = 0x98badcfe;
    let d0 = 0x10325476;
    const bytes = toBytes(input);
    const bitLength = bytes.length * 8;
    bytes.push(0x80);
    while ((bytes.length * 8) % 512 !== 448) {
        bytes.push(0x00);
    }
    for (let i = 0; i < 8; i++) {
        bytes.push((bitLength >>> (i * 8)) & 0xff);
    }
    for (let chunkStart = 0; chunkStart < bytes.length; chunkStart += 64) {
        const chunk = bytes.slice(chunkStart, chunkStart + 64);
        const w = new Array(16);
        for (let i = 0; i < 16; i++) {
            w[i] = (chunk[i * 4] | (chunk[i * 4 + 1] << 8) |
                (chunk[i * 4 + 2] << 16) | (chunk[i * 4 + 3] << 24));
        }
        let a = a0;
        let b = b0;
        let c = c0;
        let d = d0;
        for (let i = 0; i < 64; i++) {
            let f, g;

            if (i < 16) {
                f = (b & c) | (~b & d);
                g = i;
            } else if (i < 32) {
                f = (d & b) | (~d & c);
                g = (5 * i + 1) % 16;
            } else if (i < 48) {
                f = b ^ c ^ d;
                g = (3 * i + 5) % 16;
            } else {
                f = c ^ (b | ~d);
                g = (7 * i) % 16;
            }
            f = f + a + k[i] + w[g];
            a = d;
            d = c;
            c = b;
            b = b + rotateLeft(f, [7, 12, 17, 22, 7, 12, 17, 22,
                7, 12, 17, 22, 7, 12, 17, 22,
                5, 9, 14, 20, 5, 9, 14, 20,
                5, 9, 14, 20, 5, 9, 14, 20,
                4, 11, 16, 23, 4, 11, 16, 23,
                4, 11, 16, 23, 4, 11, 16, 23,
                6, 10, 15, 21, 6, 10, 15, 21,
                6, 10, 15, 21, 6, 10, 15, 21][i]);
        }
        a0 = (a0 + a) >>> 0;
        b0 = (b0 + b) >>> 0;
        c0 = (c0 + c) >>> 0;
        d0 = (d0 + d) >>> 0;
    }
    function toHex(n) {
        const str = (n >>> 0).toString(16);
        return '00000000'.substr(0, 8 - str.length) + str;
    }
    return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}