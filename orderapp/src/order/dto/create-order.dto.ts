import { IsString, IsInt, IsNumber, IsUrl , IsNotEmpty, IsOptional, Min} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @ApiProperty()
    @IsNumber()
    readonly price: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly address: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly userID: string;
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    readonly quantity: number;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly description: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly category: string;
    @ApiProperty()
    @IsUrl()
    @IsOptional()
    readonly image: string;
}