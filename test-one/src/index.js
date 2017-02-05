import Bosshog from './bosshog';
import Logger from './helpers/logger';

let bosshog = new Bosshog();
let logger = new Logger();

let result = bosshog.getResult(1, 100);
logger.log(result);


