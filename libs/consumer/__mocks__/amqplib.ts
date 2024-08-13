const amqplib = {
  connect: async () => ({
    createChannel: async () => ({
      assertExchange: async () => void(0),
      assertQueue: () => ({ queue: '' }),
      bindQueue: () => void(0),
      consume: (_queue, handler) => handler(),
    }),
  }),
};

export default amqplib;