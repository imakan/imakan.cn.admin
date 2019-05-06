import 'daruk';
import hospital from '../../src/services/hospital';

declare module 'daruk' {
  interface Service {
    hospital: hospital;
  }
}
