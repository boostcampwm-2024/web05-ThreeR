import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
    @ApiProperty({ description: 'HTTP 상태 코드' })
    private readonly statusCode: number;

    @ApiProperty({ description: '응답 데이터', required: false})
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