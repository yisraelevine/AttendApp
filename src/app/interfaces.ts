export interface classesListInterface {
	isAdmin: boolean,
	list: {
		id: number,
		name: string
	}[]
};
export interface permissionsListInterface {
	id: number,
	email: string
};
export interface studentsListInterface {
	id: number,
	last_name: string,
	first_name: string,
	visible: boolean,
	arrived: boolean | null,
	time_in: string | null,
	time_out: string | null
};
export interface datesListInterface {
	date: string,
	student_id: number,
	arrived: boolean | null,
	time_in: string | null,
	time_out: string | null
};