import IUser from "./user";

export default interface IUsers {
    data: IUser[];
    totalRows: number;
    totalPages: number;
    rowsPerPage: number;
    currentPage: number;
    previousPage: number;
    nextPage:number;
}