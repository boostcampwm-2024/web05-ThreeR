import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
    @ApiProperty({ description: 'HTTP 상태 코드' })
    private readonly status: number;

    @ApiProperty({ description: '응답 데이터', required: false})
    private readonly data: T | undefined;

    @ApiProperty( { description: '응답 메시지', required: false})
    private readonly message: string;

    private constructor(
        status: number,
        message: string,
        data?: T | undefined
    ){
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static responseWithData<U>(status: number, message: string, data: U): ApiResponse<U> {
        return new ApiResponse<U>(status, message, data);
    }

    static responseWithNoContent(status: number, message: string): ApiResponse<any> {
        return new ApiResponse(status, message);
    }
}