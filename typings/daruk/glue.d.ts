import 'daruk';
import db from '../../src/glues/db/index';
import params from '../../src/glues/params/index';

declare module 'daruk' {
  interface Glue {
    db: ReturnType<typeof db>;
    params: ReturnType<typeof params>;
  }
}
