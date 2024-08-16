export const store = {
  isConnectid: false,
  isChannelCreated: false,
  isAssertExchanged: false,
  isPublished: false,
  isClosed: false,
};

const amqplib = {
  connect: async () => {
    store.isConnectid = true;

    return {
      createChannel: async () => {
        store.isChannelCreated = true;

        return {
          assertExchange: async () => {
            store.isAssertExchanged = true;
          },
          publish: () => {
            store.isPublished = true;
          },
        };
      },
      close: async () => {
        store.isClosed = true;
      },
    };
  },
};

export default amqplib;
