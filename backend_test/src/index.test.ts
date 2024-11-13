import connectDB from './index';

test('connectDB should connect', async () => {
    await expect(connectDB()).resolves.toBeUndefined();
    return;
});