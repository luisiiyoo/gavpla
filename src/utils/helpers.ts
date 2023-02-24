import { ReactNotificationOptions } from 'react-notifications-component';

export const timestampToDateStr = (timestamp: number): string => {
  return new Date(timestamp * 1000).toDateString();
};

export const sortNumber = (
  a: number,
  b: number,
  ascending: boolean,
): number => {
  if (ascending) return a - b;
  return b - a;
};

export const createNotification = (
  type: 'success' | 'danger' | 'info' | 'default' | 'warning',
  message: string,
  title?: string,
): ReactNotificationOptions => {
  const notificationDefault: ReactNotificationOptions = {
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      pauseOnHover: true,
    },
  };
  return notificationDefault;
};
