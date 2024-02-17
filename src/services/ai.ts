function delay(timeout = 0) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
export async function requestAi() {
  await delay(1000);
  return [
    {
      id: "1",
      text: "创意1：\n我为你想了一个点子",
      favorite: true,
    },
    {
      id: "2",
      text: "创意2：\n我还有一个点子",
      favorite: false,
    },
  ];
}
