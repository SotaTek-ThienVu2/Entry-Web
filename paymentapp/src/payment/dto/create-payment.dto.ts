import { IsString, IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePaymentDto {
    @ApiProperty()
    @IsInt()
    readonly orderId: number;
    @ApiProperty()
    @IsString()
    readonly name: string;
    @ApiProperty()
    @IsString()
    readonly description: string;
    @ApiProperty()
    @IsString()
    readonly address: string;
    @ApiProperty()
    @IsNumber()
    readonly price: number;
    @ApiProperty()
    @IsString()
    readonly orderNumber: string;
}
