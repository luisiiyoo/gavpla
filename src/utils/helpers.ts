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

export const get_hover_bg_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--hover-item-bg-color',
  );
export const get_default_bg_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--default-item-bg-color',
  );
export const get_selected_bg_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--selected-item-bg-color',
  );
export const get_filtered_bg_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--filtered-item-bg-color',
  );

export const get_hover_font_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--hover-item-font-color',
  );
export const get_default_font_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--default-item-font-color',
  );
export const get_selected_font_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--selected-item-font-color',
  );
export const get_filtered_font_color = () =>
  getComputedStyle(document.documentElement).getPropertyValue(
    '--filtered-item-font-color',
  );
