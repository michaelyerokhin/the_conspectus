import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

const CANDIDATE_FILES = ['.env.local', '.env'];

for (const filename of CANDIDATE_FILES) {
  const envPath = path.resolve(process.cwd(), filename);

  if (fs.existsSync(envPath)) {
    config({ path: envPath, override: true });
  }
}