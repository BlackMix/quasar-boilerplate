import { serialize } from 'genesis/infra/services/http/resource'
import { toast } from 'genesis/support/message'

const ttl = 60000

/**
 * @link https://www.npmjs.com/package/js-cache
 * @param {AxiosRequestConfig} request
 * @param {Cache} cache
 * @returns {AxiosRequestConfig}
 */
export const httpRequest = (request, cache) => {
  // force log
  if (process.env.DEV) {
    // request.url = request.url + (request.url.indexOf('?') !== -1 ? '&' : '?') + 'log=1'
  }
  // Only cache GET requests
  if (request.method !== 'get') {
    // TODO: think about a way to clear by namespace
    cache.clear()
    return request
  }

  // turn off cache
  // request.noCache = process.env.DEV
  if (request.noCache) {
    return request
  }

  let url = request.baseURL + request.url
  if (request.params) {
    url += '?' + serialize(request.params)
  }

  const data = cache.get(url)
  if (!data) {
    return request
  }

  data.__fromCache = true
  request.data = data

  request.adapter = () => {
    return Promise.resolve({
      data: data,
      status: request.status,
      statusText: request.statusText,
      headers: request.headers,
      config: request,
      request: request
    })
  }
  return request
}

/**
 * @link https://www.npmjs.com/package/js-cache
 * @param {AxiosResponse} response
 * @param {Cache} cache
 * @returns {AxiosResponse}
 */
export const httpResponse = (response, cache) => {
  // Only cache GET responses
  if (response.config.method !== 'get') {
    // TODO: think about a way to clear by namespace
    cache.clear()
    return response
  }

  // turn off cache
  // response.config.noCache = process.env.DEV
  if (response.config.noCache) {
    return response
  }

  let url = response.config.url
  if (response.config.params) {
    url += '?' + serialize(response.config.params)
  }

  cache.set(url, response.data, response.config.ttl || ttl)

  return response
}

/**
 * @param {AxiosError} error
 * @param {AppRouter} router
 * @param {AppStore} store
 * @returns {AxiosError}
 */
export const httpError = (error, router, store) => {
  /**
   * @param {error}
   * @default {NetWorkError}
   * @returns {toast}
   */
  if (!error.response) {
    toast('NetWork Error!', 'warning', 10000, 'white', 'rgb(173, 27, 27)')
  }

  /**
   * @param {error.response.status}
   * @default {500,501}
   * @returns {toast}
   */
  if ([500, 501].includes(error.response.status)) {
    toast('Error in server!', 'warning', 10000, 'white', 'rgb(244, 185, 66)')
  }

  /**
   * @param {error.response.status}
   * @default {300,301}
   * @returns {toast}
   */
  if ([300, 301].includes(error.response.status)) {
    toast('This url does not exist or has been changed.', 'warning', 10000, 'white', 'rgb(244, 185, 66)')
  }

  /**
   * @param {error.response.status}
   * @default {400,401}
   * @returns {toast}
   */
  if ([400, 401].includes(error.response.status)) {
    toast('Error invalid authentication credentials!', 'warning', 10000, 'white', 'rgb(244, 185, 66)')
  }

  return error
}

/**
 * @param {AxiosResponse} response
 * @param {string} property
 * @param {*} fallback
 * @returns {*}
 */
export const $extract = (response, property, fallback = {}) => {
  if (!response.data) {
    return {}
  }
  if (!response.data.hasOwnProperty(property)) {
    return fallback
  }
  return response.data[property]
}

/**
 * @param {AxiosResponse} response
 * @param {*} fallback
 * @returns {*}
 */
export const $body = (response, fallback = {}) => {
  return $extract(response, 'body', fallback)
}

/**
 * @param {AxiosResponse} response
 * @param {*} fallback
 * @returns {*}
 */
export const $meta = (response, fallback = {}) => {
  return $extract(response, 'meta', fallback)
}

/**
 * @param {AxiosResponse} response
 * @param {*} fallback
 * @returns {*}
 */
export const $status = (response, fallback = {}) => {
  return $extract(response, 'status', fallback)
}

/**
 * @param {AxiosResponse} response
 * @returns {*}
 */
export const $first = (response) => {
  const content = $body(response)
  if (Array.isArray(content)) {
    return content.shift()
  }
  return content
}
