import { format } from 'date-fns';
import Configs from 'react-native-config';
import Reactotron from 'reactotron-react-native';

/**
 * Log grouped messages to the console
 */
function loggerOnBrowserConsole(
  type: string,
  title: string,
  data: unknown,
  options: any,
): void {
  /* eslint-disable no-console */
  const {
    collapsed = true,
    hideTimestamp = false,
    skip = false,
    typeColor = 'gray',
  } = options;
  const groupMethod = collapsed ? console.groupCollapsed : console.group;
  /* istanbul ignore else */
  if (Configs.ENV === 'Production') {
    const parts = [`%c ${type}`];
    const styles = [
      `color: ${typeColor}; font-weight: lighter;`,
      'color: inherit;',
    ];
    const time = format(new Date(), 'HH:mm:ss');

    if (!hideTimestamp) {
      styles.push('color: gray; font-weight: lighter;');
    }

    parts.push(`%c${title}`);

    if (!hideTimestamp) {
      parts.push(`%c@ ${time}`);
    }

    /* istanbul ignore else */
    if (!skip && !window.HIDE_LOGS) {
      groupMethod(parts.join(' '), ...styles);
      console.log(data);
      console.groupEnd();
    }
  }
  /* eslint-enable no-console */
}

/**
 * Logger log
 * @param {*} message : log message
 * @param {*} tag : log tag
 */
function logOnConsole(title, content) {
  if (__DEV__) {
    console.log(
      `[HPMerchant] ${title} ${
        content
          ? `\n ${typeof data !== 'string' ? JSON.stringify(content) : content}`
          : ''
      }`,
    );
  }
}

function logReactotron(fileName, message, content) {
  if (__DEV__) {
    Reactotron.log({
      name: fileName,
      message: message,
      value: content,
    });
  }
}

export function log(title, content) {
  const arr = title.split(/\[(.*?)\]/) || [];
  return logReactotron(arr[1] ?? title, arr[2] ?? '', content);
}
