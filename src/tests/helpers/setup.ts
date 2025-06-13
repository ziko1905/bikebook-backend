import resetDb from "./reset-db.js";

beforeEach(async () => {
  await resetDb();
  vi.clearAllMocks();
});
