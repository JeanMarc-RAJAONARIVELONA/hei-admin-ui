/**
 * @typedef RetryOptions
 * @property {number} backoff
 * @property {number} maxAttempt
 * @property {boolean} enableLog
 * @property {string} id task name
 */

/**
 * @param {string} id
 */
function logSuccessCall(id) {
  let str = "";
  if (id) str += `[${id}]: `;
  str += "resolved";
  console.log(str, "\n");
}

/**
 * @param {Pick<RetryOptions, "id"> & { attempt: number }} call
 */
function logRetryCall({ id, attempt }) {
  let str = "";
  if (id) str += `[${id}]: `;
  str += `Attempt (${attempt})`;
  console.log(str, "\n");
}

/**
 * @param {Pick<RetryOptions, "backoff" | "id"> & { attemptLeft: number }} backoff
 */
function logBackoff({ id, attemptLeft, backoff }) {
  let str = "";
  if (id) str += `[${id}]: `;
  str +=
    `${attemptLeft} attempt left, ` + `waiting ${backoff}ms before retrying`;
  console.log(str, "\n");
}

/**
 * @internal impl
 * @param {Function} cb
 * @param {RetryOptions} options
 */
function _retryOnFailure(cb, options) {
  let _timer;
  let _retryAttempt = 1;
  const { maxAttempt, backoff, enableLog, id = "" } = options;

  return (async function doRetry() {
    try {
      enableLog && logRetryCall({ attempt: _retryAttempt, id });
      await cb();
      enableLog && logSuccessCall(id);
      clearTimeout(_timer);
    } catch (e) {
      if (_retryAttempt === maxAttempt) {
        throw e;
      }
      enableLog &&
        logBackoff({ id, attemptLeft: maxAttempt - _retryAttempt, backoff });

      _retryAttempt++;
      // Note: clear previous timer if any
      if (_timer) clearTimeout(_timer);
      _timer = setTimeout(doRetry, backoff);
    }
  })();
}

/**
 * @param {Function} cb
 * @param {RetryOptions} options
 */
export function retryOnFailure(cb, options) {
  if (options.maxAttempt > 0) return _retryOnFailure(cb, options);
  throw new Error("Invalid attempt");
}

