import { useState } from 'react';
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

export const useConstructor = (callBack: () => void) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

export const getVariableName = (v: any): string => {
  return Object.keys({ v })[0];
};

export const removeEmpty = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export const isAComputerDevice = (): boolean => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return false;
  }
  return true;
};

export const isASmallDeviceByWidth = (width: number): boolean => {
  return window.screen.width < width;
};

export const isASmallDeviceByHeight = (height: number): boolean => {
  return window.screen.height < height;
};

export const toTitleCase = (str: string): string =>
  str
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');
