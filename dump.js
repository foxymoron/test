const baseStack = [];
const baseLinks = [];
const baseLoading = [];
const partialStack = [];
const partialLinks = [];
const backgroundApps = [];
const backgroundLinks = [];

function launch({ name, data }) {

  const next = name;
  const nextIsSource = sourceApps.includes(next);
  const nextIsPartial = partialApps.includes(next);
  const nextIsFull = !nextIsSource && !nextIsPartial;
  const nextInBackground = backgroundApps.includes(next);
  let nextLink = data.origin;
  let nextLoading = true;
  let nextRestoring = data.restoring;
  
  if (partialStack.length) {
    // send cur partial apps to background
    const cur = partialStack[partialStack.length - 1];
    const curLink = partialLinks[partialLinks.length - 1];
    if (next === cur) return;
    commit('App_PARTIAL_REMOVE', { name: cur });
    commit('App_BACKGROUND_ADD', { name: cur, link: curLink });
    dispatch(`${next}/${next}_HIDE`);
  }
  
  if (nextIsPartial) {
    if (nextInBackground) {
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
    if (next === cur) return;
    if (nextInBackground) {
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
    const curIsFull = cur && !curIsSource;
    if (next === cur) return;
    if (curIsFull) {
      commit('App_BASE_REMOVE', { name: cur });
      commit('App_BACKGROUND_ADD', { name: cur, link: curLink });
    }
    if (curIsSource) {
      commit('App_BASE_REMOVE', { name: cur });
      commit('App_SOURCE_HISTORY_ADD', { name: cur });
    }
    if (nextInBackground) {
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
