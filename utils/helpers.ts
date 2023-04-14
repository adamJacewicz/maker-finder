export const asyncFilter = async <T>(arr: Array<T>, predicate: (value: T) => Promise<boolean>) =>
	await Promise.all(arr.map(predicate)).then((res) => arr.filter((_v, i) => res[i]));
