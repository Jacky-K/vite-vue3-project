export const cancelRequest = {
  mounted(el, binding) {
    const { callback, loading } = binding.value

    el.classList.add('el-loading-parent--relative')

    el.loadingHandler = (loading) => {
      const loadingInstanse = el.querySelector('.el-loading-mask')
      if (loadingInstanse && !loading) {
        el.removeChild(loadingInstanse)
        return
      }

      const div = document.createElement('div')
      div.classList.add('el-loading-mask')

      const loadingContent = document.createElement('div')
      const loadingDom = `
      <div class="el-loading-spinner">
        <svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg>
        <div><button id="button" class="el-button el-button--primary">取消请求</button></div>
      </div>
    `
      loadingContent.innerHTML = loadingDom
      div.appendChild(loadingContent)

      loadingContent.querySelector('#button').addEventListener('click', () => {
        callback && callback()
      })

      if (loading) {
        el.appendChild(div)
      }
    }

    el.loadingHandler(loading)
  },
  updated(el, binding) {
    el.loadingHandler(binding.value.loading)
  },
  beforeUnmount() {}
}
