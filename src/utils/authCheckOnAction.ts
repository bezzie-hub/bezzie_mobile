import {setAuthModalStatus} from '@store/slices/other';
import {store} from '@store/index';

/**
 * Excecutes action after authentication check
 *
 * @async
 * @param {() => void} cb
 * @returns {void) => any}
 */
async function authCheckOnAction(cb: () => void) {
  if (store.getState().user?.isAuthenticated) {
    cb();
  } else {
    store.dispatch(setAuthModalStatus('login'));
    let unsubscribe: () => void;
    unsubscribe = store.subscribe(async () => {
      if (store.getState().user.isAuthenticated) {
        unsubscribe();
        cb();
      }
      if (store.getState().other.authModalStatus === 'none') {
        unsubscribe();
      }
    });
  }
}

export default authCheckOnAction;
