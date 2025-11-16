export interface IModal {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
}

export interface ISaveModal extends IModal {
	status: string
	message?: string
}

export interface IStatusAlert extends IModal {
	status: 'success' | 'error'
}
