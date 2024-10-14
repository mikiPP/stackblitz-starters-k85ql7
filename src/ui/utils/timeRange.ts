export function getLabels(time: Time) {
  switch (time) {
    case 'week':
      return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    case 'month':
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    case 'year':
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  }
}

export function getMaximumValue(time: Time) {
  switch (time) {
    case 'week':
      return 100;
    case 'month':
      return 500;
    case 'year':
      return 1000;
  }
}

export type Time = 'week' | 'month' | 'year';

export const timeOptions = ['week', 'month', 'year'];
