import { findHusbBy } from './services/hero.service';

const nam = findHusbBy(1);

console.log(nam?.name ?? 'No hero founds');