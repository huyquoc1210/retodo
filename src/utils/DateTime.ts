import dayjs, { Dayjs } from 'dayjs';

// Plugins
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

class Utils {
  constructor() {
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
  }

  public isValid(date: any): date is Dayjs {
    if (!date) return false;
    return dayjs(date).isValid();
  }

  public IsSameOrBefore(from?: any, to?: any): boolean {
    if (!this.isValid(from) || !this.isValid(to)) return true;
    return dayjs(from).isSameOrBefore(to);
  }

  public IsSameOrAfter(from?: any, to?: any): boolean {
    if (!this.isValid(from) || !this.isValid(to)) return true;
    return dayjs(from).isSameOrAfter(to);
  }
}

const DateTime = new Utils();
export default DateTime;
