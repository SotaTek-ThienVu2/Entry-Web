import { IsString, IsInt, IsNumber, IsUrl } from 'class-validator';
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
    @ApiProperty()
    @IsInt()
    readonly quantity: number;
    @ApiProperty()
    @IsString()
    readonly category: string;
    @ApiProperty()
    @IsUrl()
    readonly image: string;
}
