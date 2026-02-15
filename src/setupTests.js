import '@testing-library/jest-dom';

// Create storage object with methods
const storage = {
  data: {},
  setItem(key, value) {
    this.data[key] = value.toString();
  },
  getItem(key) {
    return this.data[key] || null;
  },
  removeItem(key) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  }
};

// Mock localStorage with vi.fn() for spying
const localStorageMock = {
  getItem: vi.fn((key) => storage.getItem(key)),
  setItem: vi.fn((key, value) => storage.setItem(key, value)),
  removeItem: vi.fn((key) => storage.removeItem(key)),
  clear: vi.fn(() => storage.clear()),
};

global.localStorage = localStorageMock;

// Reset localStorage before each test
beforeEach(() => {
  storage.data = {};
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});

