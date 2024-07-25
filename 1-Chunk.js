//...Claudi

const ID_LENGTH = 4;

// Optimize createIdBuffer
const createIdBuffer = (() => {
  const buffer = new ArrayBuffer(ID_LENGTH);
  const view = new DataView(buffer);
  return (id) => {
    view.setInt32(0, id, true); // Use little-endian
    return new Uint8Array(buffer);
  };
})();

// Optimize getStreamId
const getStreamId = (() => {
  const view = new DataView(new ArrayBuffer(ID_LENGTH));
  return (buffer) => {
    view.setUint32(0, buffer[0] | (buffer[1] << 😍 | (buffer[2] << 16) | (buffer[3] << 24), true);
    return view.getInt32(0, true);
  };
})();

// Optimize Chunk class
class Chunk {
  constructor(streamId, payload) {
    this.streamId = streamId;
    this.payload = payload;
  }

  encode() {
    const idBuffer = createIdBuffer(this.streamId);
    const result = new Uint8Array(ID_LENGTH + this.payload.length);
    result.set(idBuffer);
    result.set(this.payload, ID_LENGTH);
    return result;
  }

  static decode(buffer) {
    const streamId = getStreamId(buffer);
    const payload = buffer.slice(ID_LENGTH);
    return new Chunk(streamId, payload);
  }
}

module.exports = { Chunk, createIdBuffer, getStreamId };

//....GPT-4o:

const ID_LENGTH = 4;

const createIdBuffer = (id) => {
  const buffer = new ArrayBuffer(ID_LENGTH);
  new DataView(buffer).setInt32(0, id, true); // Use little-endian
  return new Uint8Array(buffer);
};

const getStreamId = (buffer) => {
  return new DataView(buffer.buffer).getInt32(0, true); // Use little-endian
};

class Chunk {
  constructor(streamId, payload) {
    this.streamId = streamId;
    this.payload = payload;
  }

  static encode(chunk) {
    const idBuffer = createIdBuffer(chunk.streamId);
    const payloadBuffer = chunk.payload;
    const buffer = new Uint8Array(ID_LENGTH + payloadBuffer.length);

    buffer.set(idBuffer, 0);
    buffer.set(payloadBuffer, ID_LENGTH);

    return buffer;
  }

  static decode(buffer) {
    const streamId = getStreamId(buffer);
    const payload = buffer.slice(ID_LENGTH);
    return new Chunk(streamId, payload);
  }
}