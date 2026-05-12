export const fakeDelay = (ms = 400) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
