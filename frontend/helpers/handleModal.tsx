export const handleModal = (id: string) => {
	document.getElementById(id)?.classList.toggle('modal-open');
};
