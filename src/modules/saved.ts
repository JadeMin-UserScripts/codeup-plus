import type { Saved, SavedWithExpires } from "./@types/saved.js";

const { editor } = unsafeWindow;



const problemNumber = (document.querySelector("input#problem_id") as HTMLInputElement).value;
const storageName = `editor_${problemNumber}`;
export const _getSaved = (): SavedWithExpires | null => JSON.parse(localStorage.getItem(storageName)!);
export const _removeSaved = (): void => localStorage.removeItem(storageName);
export const _cleanSaved = (): true | null => {
	const saved = _getSaved();

	if(saved === null) return null;
	if(Date.now() > saved.expires) {
		_removeSaved();
		return true;
	} else return null;
};
export const getSaved = (): Saved | null => {
	const saved = _getSaved();
	if(saved === null) return null;

	return saved.value;
};
export const setSaved = (obj: {[key: string]: any}, expireDate: number = 5000): void => {
	return localStorage.setItem(storageName, JSON.stringify({
		value: obj,
		expires: Date.now() + expireDate
	}));
};

// 초기화
_cleanSaved();