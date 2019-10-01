const baseStack = [];
const baseLinks = [];
const baseLoading = [];
const partialStack = [];
const partialLinks = [];
const superStack = [];
const superLinks = [];
const backgroundApps = [];
const backgroundLinks = [];

function launch({ name, data }) {

  const next = name;
  const nextIsSource = sourceApps.includes(next);
  const nextIsPartial = partialApps.includes(next);
  const nextIsFull = fullApps.includes(next);
  const nextIsSuper = superApps.includes(next);
  const nextInBackground = backgroundApps.includes(next);
  let nextLink = data.origin;
  let nextLoading = true;
  let nextRestoring = data.restoring;
  
  if (superStack.length) {
    // send cur super apps to background
    const cur = superStack[superStack.length - 1];
    const curLink = superLinks[superLinks.length - 1];
    if (next !== cur) {
      commit('App_SUPER_REMOVE', { name: cur });
      commit('App_BACKGROUND_ADD', { name: cur, link: curLink });
      dispatch(`${next}/${next}_HIDE`);
    }
  }
  
  if (partialStack.length) {
    // send cur partial apps to background
    const cur = partialStack[partialStack.length - 1];
    const curLink = partialLinks[partialLinks.length - 1];
    if (next !== cur) {
      commit('App_PARTIAL_REMOVE', { name: cur });
      commit('App_BACKGROUND_ADD', { name: cur, link: curLink });
      dispatch(`${next}/${next}_HIDE`);
    }
  }
  
  if (nextIsSuper) {
    const cur = superStack[superStack.length - 1];
    const curLink = superLinks[superLinks.length - 1];
    if (next !== cur && nextInBackground) {
      if (nextRestoring) {
        nextLink = backgroundLinks[backgroundApps.indexOf(next)];
      }
      commit('App_BACKGROUND_REMOVE', { name: next });
    }
    commit('App_SUPER_ADD', { name: next, link: nextLink });
    dispatch(`${next}/${next}_SET`, data);
    dispatch(`${next}/${next}_SHOW`);
    return;
  }
  
  if (nextIsPartial) {
    const cur = partialStack[partialStack.length - 1];
    const curLink = partialLinks[partialLinks.length - 1];
    if (next !== cur && nextInBackground) {
      if (nextRestoring) {
        nextLink = backgroundLinks[backgroundApps.indexOf(next)];
      }
      commit('App_BACKGROUND_REMOVE', { name: next });
    }
    commit('App_PARTIAL_ADD', { name: next, link: nextLink });
    dispatch(`${next}/${next}_SET`, data);
    dispatch(`${next}/${next}_SHOW`);
    return;
  }
  
  if (nextIsFull) {
    const cur = baseStack[baseStack.length - 1];
    const curLink = baseLinks[baseLinks.length - 1];
    if (next === cur) nextLoading = false;
    if (next !== cur && nextInBackground) {
      if (nextRestoring) {
        nextLink = backgroundLinks[backgroundApps.indexOf(next)];
      }
      commit('App_BACKGROUND_REMOVE', { name: next });
      nextLoading = false;
    }
    commit('App_BASE_ADD', { name: next, link: nextLink, loading: nextLoading });
    dispatch(`${next}/${next}_SET`, data);
    // previous need to be removed after loading
    return;
  }
  
  if (nextIsSource) {
    const cur = baseStack[baseStack.length - 1];
    const curLink = baseLinks[baseLinks.length - 1];
    const curIsSource = cur && sourceApps.includes(cur);
    const curIsFull = cur && fullApps.includes(cur);
    if (next === cur) nextLoading = false;
    if (next !== cur && curIsFull) {
      commit('App_BASE_REMOVE', { name: cur });
      commit('App_BACKGROUND_ADD', { name: cur, link: curLink });
    }
    if (next !== cur && curIsSource) {
      commit('App_BASE_REMOVE', { name: cur });
      commit('App_SOURCE_HISTORY_ADD', { name: cur });
    }
    if (next !== cur && nextInBackground) {
      if (nextRestoring) {
        nextLink = backgroundLinks[backgroundApps.indexOf(next)];
      }
      commit('App_BACKGROUND_REMOVE', { name: next });
      nextLoading = false;
    }
    commit('App_BASE_ADD', { name: next, link: nextLink, loading: nextLoading });
    commit('App_SOURCE_SET', { name: next });
    dispatch(`${next}/${next}_SET`, data);
    return;
  }

}

function close({ name }) {
  
  const cur = name;
  const curIsSource = sourceApps.includes(cur);
  const curIsPartial = partialApps.includes(cur);
  const curIsFull = fullApps.includes(cur);
  const curIsSuper = superApps.includes(next);
  
  if (curIsSuper) {
    const curLink = superLinks[superStack.indexOf(cur)];
    commit('App_SUPER_REMOVE', { name: cur });
    dispatch(`${cur}/${cur}_HIDE`);
    const next = curLink;
    const nextInBackground = next && backgroundApps.includes(next);
    if (nextInBackground) {
      launch({ name: next, data: { restoring: true } });
    }
    return;
  }
  
  if (curIsPartial) {
    const curLink = partialLinks[partialStack.indexOf(cur)];
    commit('App_PARTIAL_REMOVE', { name: cur });
    dispatch(`${cur}/${cur}_HIDE`);
    const next = curLink;
    const nextInBackground = next && backgroundApps.includes(next);
    if (nextInBackground) {
      launch({ name: next, data: { restoring: true } });
    }
    return;
  }
  
  if (curIsFull) {
    const curLink = baseLinks[baseStack.indexOf(cur)];
    commit('App_BASE_REMOVE', { name: cur });
    const next = curLink;
    const nextInBackground = next && backgroundApps.includes(next);
    const nextIsSource = next && sourceApps.includes(next);
    const nextIsPartial = next && partialApps.includes(next);
    const nextIsFull = next && fullApps.includes(next);
    if (nextInBackground && nextIsFull) {
      launch({ name: next, data: { restoring: true } });
      return;
    }
    if (nextInBackground && nextIsPartial) {
      launch({ name: sourceApp, data: { restoring: true } });
      launch({ name: next, data: { restoring: true } });
      return;
    }
    launch({ name: sourceApp, data: { restoring: true } });
    return;
  }
  
}

function sendPrev2Background() {
  const cur = baseStack[0];
  const curLink = baseLinks[0];
  commit('App_BASE_REMOVE', { name: cur });
  commit('App_BACKGROUND_ADD', { name: cur, link: curLink });
}
