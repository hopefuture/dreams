import moment from 'moment';
import filePackage from 'file-package';

const filePath = `dreams-${moment().format('YYYYMMDD')}`;
const fileName = `${filePath}.zip`;
filePackage('dist', `zip/${fileName}`, {
  packageRoot: filePath
});
