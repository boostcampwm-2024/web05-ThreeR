export class ApiResponse<T> {
    private readonly statusCode: number;
    private readonly data: T | undefined;

    private constructor(
        statusCode: number,
        data?: T | undefined
    ){
        this.statusCode = statusCode;
        this.data = data;
    }

    static success<U>(statusCode: number, data: U): ApiResponse<U> {
        return new ApiResponse<U>(statusCode, data);
    }

    static successWithNoContent(statusCode: number): ApiResponse<any> {
        return new ApiResponse(statusCode, undefined);
    }
}