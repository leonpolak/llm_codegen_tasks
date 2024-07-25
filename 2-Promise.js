//...Cloude:

const fs = require('node:fs').promises;

const DEFAULT_CONFIG = {
  port: 80
};


async function loadConfig() {
  try {
    const data = await fs.readFile('config.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn('Config file not found. Using default configuration.');
    } else {
      console.error('Error reading config file:', error.message);
    }
    return DEFAULT_CONFIG;
  }
}

(async () => {
  const config = await loadConfig();
  console.log({ config });
})();

//...GPT-4o:

const fs = require('node:fs').promises;

const DEFAULT_CONFIG = { port: 80 };

(async () => {
  let data;
  try {
    data = await fs.readFile('config.json', 'utf8');
  } catch (error) {
    console.error('Error reading config file:', error);
    data = null; // Explicitly set data to null in case of error
  }

  let config;
  if (data) {
    try {
      config = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing config file:', error);
      config = DEFAULT_CONFIG;
    }
  } else {
    config = DEFAULT_CONFIG;
  }

  console.log({ config });
})();
