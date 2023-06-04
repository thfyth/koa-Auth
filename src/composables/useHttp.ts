// const useConfig = useRuntimeConfig();

import { LocalEnum } from '~/enums';
// const toast = useToast();

const BASE_URL = 'http://localhost:3000/api/v1';
// 请求方法封装
const fetch = $fetch.create({
	baseURL: BASE_URL,
	// 请求拦截
	async onRequest({ request, options }) {
		// options.headers
		// 新增认证
		const token = await useCookie(LocalEnum.TOKEN)
		if (token.value) {
			const headers: Headers = new Headers(options.headers);
			headers.set('authorization', 'Bearer ' + token.value);
			options.headers = headers;
		}
	},
	// 响应拦截
	onResponse({ request, options, response }) {
		const bus = useEventBus<string>('toast');
		const data = response._data;
		if (data.code === 401) {
		} else if (data.code === 400) {
			bus.emit(data.msg);
		}
	},
	onResponseError(error) {
		console.log(error);
	},
});

interface response {
	code: number;
	data: any;
	errorCode: number;
	msg: string;
}

export const useHttp = () => {
	return {
		get: (url: string, params?: object): Promise<response> => {
			return fetch(url, {
				method: 'GET',
				params,
			});
		},
		post: (url: string, body?: object): Promise<response> => {
			return fetch(url, {
				method: 'POST',
				body,
			});
		},
	};
};
