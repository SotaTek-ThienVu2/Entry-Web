import { IsString, IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    readonly name: string;
    @ApiProperty()
    @IsInt()
    readonly price: number;
    @ApiProperty()
    @IsString()
    readonly description: string;
}